"use client";

import {
  GetAllUsersServiceResponseType,
  useDeleteUserService,
  useGetAllUserProfileService,
} from "@/api/profile";
import { Trash2 } from "lucide-react";
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { getLoggedInUserDetails } from "../(auth)/utils";
import DeleteAlert from "./DeleteAlert";

const UserProfilesPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data = [], isLoading } = useGetAllUserProfileService();
  const { mutate: deleteUser, isPending } = useDeleteUserService();

  const columns: MRT_ColumnDef<GetAllUsersServiceResponseType[number]>[] =
    useMemo(
      () => [
        {
          accessorKey: "_id",
          header: "ID",
        },
        {
          accessorKey: "name",
          header: "Name",
        },
        {
          accessorKey: "email",
          header: "Email",
        },
        {
          accessorKey: "userProfile.gender",
          header: "Gender",
        },
        {
          accessorKey: "userProfile.age",
          header: "Age",
        },
        {
          id: "delete",
          header: "",
          Cell: (props) => (
            <Trash2
              color="red"
              cursor="pointer"
              onClick={() => {
                setSelectedId(props.row.original._id);
                setIsOpen(true);
              }}
            />
          ),
        },
      ],
      []
    );

  const table = useMaterialReactTable({
    columns,
    data,
    state: {
      isLoading: isLoading || isPending,
    },
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableColumnActions: false,
  });

  const user = getLoggedInUserDetails();
  const router = useRouter();

  useEffect(() => {
    if (!user || !user.isAdmin) {
      return router.replace("/");
    }
  }, [router, user]);

  if (!user || !user.isAdmin) {
    return null;
  }

  return (
    <>
      <MaterialReactTable table={table} />
      <DeleteAlert
        open={isOpen}
        onOpenChange={setIsOpen}
        onSave={() => deleteUser(selectedId)}
      />
    </>
  );
};

export default UserProfilesPage;

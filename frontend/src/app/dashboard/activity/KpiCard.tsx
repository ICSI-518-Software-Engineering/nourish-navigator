import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { ReactNode } from "react";

type KpiCardProps = {
  children: ReactNode;
};

const KpiCard: React.FC<KpiCardProps> = (props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        {/* <CardTitle className="text-sm font-medium">{props.title}</CardTitle> */}
      </CardHeader>
      <CardContent>{props.children}</CardContent>
    </Card>
  );
};

export default KpiCard;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIrecipeZOD = void 0;
var zod_1 = require("zod");
exports.APIrecipeZOD = zod_1.z.object({
    recipe: zod_1.z.object({
        uri: zod_1.z.string(),
        label: zod_1.z.string(),
        image: zod_1.z.string(),
        images: zod_1.z.object({
            THUMBNAIL: zod_1.z.object({
                url: zod_1.z.string(),
                width: zod_1.z.number(),
                height: zod_1.z.number()
            }),
            SMALL: zod_1.z.object({
                url: zod_1.z.string(),
                width: zod_1.z.number(),
                height: zod_1.z.number()
            }),
            REGULAR: zod_1.z.object({
                url: zod_1.z.string(),
                width: zod_1.z.number(),
                height: zod_1.z.number()
            }),
            LARGE: zod_1.z.object({
                url: zod_1.z.string(),
                width: zod_1.z.number(),
                height: zod_1.z.number()
            })
        }),
        source: zod_1.z.string(),
        url: zod_1.z.string(),
        shareAs: zod_1.z.string(),
        yield: zod_1.z.number(),
        dietLabels: zod_1.z.array(zod_1.z.string()),
        healthLabels: zod_1.z.array(zod_1.z.string()),
        cautions: zod_1.z.array(zod_1.z.string()),
        ingredientLines: zod_1.z.array(zod_1.z.string()),
        ingredients: zod_1.z.array(zod_1.z.object({
            text: zod_1.z.string(),
            quantity: zod_1.z.number(),
            measure: zod_1.z.string(),
            food: zod_1.z.string(),
            weight: zod_1.z.number(),
            foodId: zod_1.z.string()
        })),
        calories: zod_1.z.number(),
        glycemicIndex: zod_1.z.number(),
        inflammatoryIndex: zod_1.z.number(),
        totalCO2Emissions: zod_1.z.number(),
        co2EmissionsClass: zod_1.z.string(),
        totalWeight: zod_1.z.number(),
        cuisineType: zod_1.z.array(zod_1.z.string()),
        mealType: zod_1.z.array(zod_1.z.string()),
        dishType: zod_1.z.array(zod_1.z.string()),
        instructions: zod_1.z.array(zod_1.z.string()),
        tags: zod_1.z.array(zod_1.z.string()),
        externalId: zod_1.z.string(),
        totalNutrients: zod_1.z.object({
            additionalProp1: zod_1.z.object({
                label: zod_1.z.string(),
                quantity: zod_1.z.number(),
                unit: zod_1.z.string()
            }),
            additionalProp2: zod_1.z.object({
                label: zod_1.z.string(),
                quantity: zod_1.z.number(),
                unit: zod_1.z.string()
            }),
            additionalProp3: zod_1.z.object({
                label: zod_1.z.string(),
                quantity: zod_1.z.number(),
                unit: zod_1.z.string()
            })
        }),
        totalDaily: zod_1.z.object({
            additionalProp1: zod_1.z.object({
                label: zod_1.z.string(),
                quantity: zod_1.z.number(),
                unit: zod_1.z.string()
            }),
            additionalProp2: zod_1.z.object({
                label: zod_1.z.string(),
                quantity: zod_1.z.number(),
                unit: zod_1.z.string()
            }),
            additionalProp3: zod_1.z.object({
                label: zod_1.z.string(),
                quantity: zod_1.z.number(),
                unit: zod_1.z.string()
            })
        }),
        digest: zod_1.z.array(zod_1.z.object({
            label: zod_1.z.string(),
            tag: zod_1.z.string(),
            schemaOrgTag: zod_1.z.string(),
            total: zod_1.z.number(),
            hasRDI: zod_1.z.boolean(),
            daily: zod_1.z.number(),
            unit: zod_1.z.string(),
            sub: zod_1.z.string()
        }))
    }),
    _links: zod_1.z.object({
        self: zod_1.z.object({ href: zod_1.z.string(), title: zod_1.z.string() }),
        next: zod_1.z.object({ href: zod_1.z.string(), title: zod_1.z.string() })
    })
});

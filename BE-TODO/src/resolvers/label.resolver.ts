import { Label } from "../model/label.model";

export const resolversLabel = {
    Query: {
        getListLabel: async (_: any, args: any) => {
            const labels = await Label.find({
                deleted: false
            }).sort({ created_at: -1 });
            return labels;
        },
    },

}
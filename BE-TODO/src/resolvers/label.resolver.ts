import { create } from "domain";
import { Label } from "../model/label.model";
import { getUserIdFromToken } from "../utils/auth";

export const resolversLabel = {
    Query: {
        getListLabel: async (_: any, args: any) => {
            const labels = await Label.find({
                deleted: false
            }).sort({ created_at: -1 });
            return labels;
        },
    },
    Mutation: {
        createLabel: async (_: any, args: any, context: any) => {
            try {
                const userId = getUserIdFromToken(context.req);
                const { label } = args;
                const newLabel = new Label({
                    ...label,
                    created_by: userId
                });
                await newLabel.save();
                return newLabel;
            } catch (error) {
                throw new Error("Invalid token");
            }

        },
        updateLabel: async (_: any, args: any) => {
            const { id, label } = args;
            const updatedLabel = await Label.findByIdAndUpdate(id, label, { new: true });
            return updatedLabel;
        },
        deleteLabel: async (_: any, args: any) => {
            const { id } = args;
            await Label.findByIdAndDelete(id);
            return true;
        }
    }

}
import { gql } from "@apollo/client";

export const CREATE_LABEL = gql`
    mutation createLabel($label: LabelInput!) {
        createLabel(label: $label) {
        id
        name
        color
        }
    }
`;


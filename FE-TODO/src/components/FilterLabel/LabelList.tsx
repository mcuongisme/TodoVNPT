import { Divider } from "antd";
import { TagOutlined } from "@ant-design/icons";
import { LoadData } from '../Common/LoadData';
import { useLabels } from "../../hooks/useLabels";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/paths";
export const LabelList = () => {
    const { labels, loading, error } = useLabels();
    const navigate = useNavigate();
    if (loading || error) return <LoadData loading={loading} error={error} />;
    return (
        <div>
            {labels.map((label: any) => (
                <div
                    key={label.id}
                    onClick={() => navigate(ROUTES.LABEL(label.id))}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "5px 20px",
                        gap: 8,
                        cursor: "pointer", // 👈 có thêm cursor pointer
                        userSelect: "none",
                    }}
                >
                    <TagOutlined style={{ color: label.color }} />
                    <span>{label.name}</span>
                </div>
            ))}
        </div>
    );
};


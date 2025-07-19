import { Divider } from "antd";
import { TagOutlined } from "@ant-design/icons";
import { LoadData } from '../Common/LoadData';
import { useLabels } from "../../hooks/useLabels";
export const LabelList = () => {
    const { labels, loading, error } = useLabels()
    if (loading || error) return <LoadData loading={loading} error={error} />;
    return (
        <div>
            {labels.map((label: any) => (
                <>
                    <div
                        key={label.id}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "5px 20px",
                            gap: 8,
                        }}
                    >
                        <TagOutlined style={{ color: label.color }} />
                        <span>{label.name}</span>
                    </div>
                    <Divider size='small' />
                </>

            ))}
        </div>
    )
}

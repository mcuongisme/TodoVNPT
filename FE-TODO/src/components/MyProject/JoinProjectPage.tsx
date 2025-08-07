import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { JOIN_PROJECT } from '../../graphql/mutations/projectMutations';
import { ROUTES } from '../../routes/paths';
export const JoinProjectPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [joinProject] = useMutation(JOIN_PROJECT);

    useEffect(() => {
        if (!token) return;

        joinProject({ variables: { token } })

            .then((res) => {
                const id = res.data?.joinProject?.id;
                console.log(res.data)
                if (id) {
                    alert('Tham gia dự án thành công!');
                    navigate(ROUTES.PROJECT.DETAIL(id));
                } else {
                    alert('Không lấy được ID dự án.');
                }
            })
            .catch((err) => {
                console.error(err);
                alert('Không thể tham gia dự án.');
            });
    }, [token]);

    return <p>Đang xử lý tham gia dự án...</p>;
};

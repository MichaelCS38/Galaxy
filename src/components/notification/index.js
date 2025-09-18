import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function useNotification() {
    return ({ type = "info", title, description, duration = 2000 }) => {
        toast[type](
            <div style={{ minWidth: 280 }}>
                {title && <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{title}</div>}
                {description && <div style={{ color: '#555', fontSize: 14 }}>{description}</div>}
            </div>,
            {
                position: "top-right",
                autoClose: duration,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }
        );
    };
}


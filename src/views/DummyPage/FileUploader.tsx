import { useState } from 'react';
import axios from 'axios';
// import { toast} from 'react-toastify';

// import './style.css';
import MessageAPI from '../../api/MessageAPI';

export const FileUploader = ({ onSuccess }: any) => {
    const [files, setFiles] = useState([]);
    // const token = localStorage.getItem("token");

    const onInputChange = (e: any) => {
        setFiles(e.target.files)
    };

    const onSubmit = (e: any) => {
        e.preventDefault();

        const data = new FormData();

        for (let i = 0; i < files.length; i++) {
            data.append('file', files[i]);
        }

        // axios.post('//localhost:8000/upload', data)
        MessageAPI.sendMessage(data)
            .then((response) => {
                console.log(response.data)
                onSuccess(response.data)
            })
            .catch((e) => {
            })
    };

    return (
        <form method="post" action="#" id="#" onSubmit={onSubmit}>
            <div className="form-group files">
                <label>Upload Your File </label>
                <input type="file"
                    onChange={onInputChange}
                    className="form-control"
                    multiple />
            </div>

            <button>Submit</button>
        </form>
    )
};
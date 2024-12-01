import {FC, useState} from "react"
import {useNavigate} from "react-router-dom";
import constants from "@/helper/constant.helper";
import {useAuth} from "@/hooks";
import toast from "react-hot-toast";

interface LoginForm {
    username: string;
    password: string;
}

const LoginPage: FC = () => {
    const navigate = useNavigate();
    const {login} = useAuth()!;
    const [formData, setFormData] = useState<LoginForm>({
        username: '',
        password: '',
    });
    const [error, setError] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(formData.username, formData.password,(data) => {
            if (data.success){
                toast.success("Đăng nhập thành công")
                navigate("/")
            }
        },(error)=>{
            setError(error)
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-blue-600">Bệnh Viện {constants.dentistName}</h1>
                    <p className="text-gray-600">Đăng nhập hệ thống</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-gray-700 mb-2">
                            Tên đăng nhập
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Nhập tên đăng nhập"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Nhập mật khẩu"
                        />
                    </div>

                    <div className="flex items-center justify-end">
                        <a
                            href="/forgot-password"
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Quên mật khẩu?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Đăng nhập
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Bạn cần hỗ trợ?{' '}
                        <a href="/lien-he" className="text-blue-600 hover:underline">
                            Liên hệ
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default LoginPage
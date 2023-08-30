import './App.css';
import { useState } from 'react';

function App() {
    const initialValues = { username: "", mailAddress: "", password: "" }
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        // console.log(e.currentTarget.value);
        const { name, value } = e.currentTarget;
        setFormValues({ ...formValues, [name]: value });
        // console.log(formValues);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // ログイン情報を送信する
        // バリテーションチェックをする
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    const validate = (values) => {
        const errors = {};
        const regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

        if(!values.username){
            errors.username = "ユーザーネームを入れてください";
        }
        if(!values.mailAddress){
            errors.mailAddress = "メールアドレスを入れてください";
        } else if (!regex.test(values.mailAddress)){
            errors.mailAddress = "正しいメールアドレスを入力してください";
        }
        if(!values.password){
            errors.password = "パスワードを入れてください";
        } else if (values.password.length < 4){
        errors.password = "パスワードが4文字以下のためログインに失敗しました";
        } else if (values.password.length > 20 ){
            errors.password = "パスワードが20文字以上のためログインに失敗しました";
        }
        return errors;
    };


    return (
        <div className="formContainer">
            <form onSubmit={ (e) => handleSubmit(e) }>
                <h1>ログインフォーム</h1>
                <hr />
                <div className='uiForm'>
                    <div className='formField'>
                    <label>ユーザー名</label>
                    <input
                        type='text'
                        placeholder='ユーザー名'
                        name='username'
                        onChange={(e) => handleChange(e)} />
                    </div>
                    <p className = "errorMsg">{formErrors.username}</p>
                    <div className='formField'>
                    <label>メールアドレス</label>
                    <input
                        type='text'
                        placeholder='メールアドレス'
                        name='mailAddress'
                        onChange={(e) => handleChange(e)} />
                    </div>
                    <p className = "errorMsg">{formErrors.mailAddress}</p>
                    <div className='formField'>
                    <label>パスワード</label>
                    <input
                        type='text'
                        placeholder='パスワード'
                        name='password'
                        onChange={(e) => handleChange(e)} />
                    </div>
                    <p className = "errorMsg">{formErrors.password}</p>
                    <button className='submitButton'>ログイン</button>
                    {Object.keys(formErrors).length === 0 && isSubmit && (
                        <div className='magOK'>ログインに成功しました</div>
                    )}
                </div>
            </form>
        </div>
    );
}

export default App;

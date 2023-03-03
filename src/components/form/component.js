import { useState } from 'react';
import './style.css'
import axiosObj from '../../services/axios'


function Form() {
    function checkPasswordLength(e) {
        if (e.target.value < 8) {
            e.target.value = 8;
        }
        if (e.target.value >= 100) {
            e.target.value = 100;
        }
        handleChange(e);
    }
    var [loadingStatus, setLoadingStatus] = useState(false);
    var [formData, setFormData] = useState({
        'password-length': 8,
        'upper-case': true,
        'lower-case': true,
        'numeric': true,
        'symbols': true,
    });
    var [data, setData] = useState('');
    function handleChange(e) {
        if (e.target.type === 'checkbox') {
            setFormData(value => ({ ...value, [e.target.name]: e.target.checked }));
        }
        else {
            setFormData(value => ({ ...value, [e.target.name]: parseInt(e.target.value) }));
        }
    }
    function generatePassword(e) {
        setLoadingStatus(true);
        e.preventDefault();
        let promise = new Promise((resolve, reject) => {
            axiosObj.post('/', formData).then(response => {
                setData(response.data.data);
                resolve(true)
            }, error => {
                if (error.response) {
                    setData(error.response.data.error);
                }
                resolve(false)
            })
        }
        );
        promise.then(() => { setLoadingStatus(false) })
    }
    function copy(e) {
        e.preventDefault();
        navigator.clipboard.writeText(data);
    }
    return (
        <form id='password-form'>
            <div className='form-group'>
                <label>Password Length</label>
                <input
                    type='number'
                    onChange={checkPasswordLength}
                    className='password-length'
                    defaultValue={formData['password-length']}
                    name='password-length'
                />
            </div>
            <div className='form-group'>
                <input
                    type='checkbox'
                    defaultChecked={formData['upper-case']}
                    onChange={handleChange}
                    name='upper-case'
                />
                <label>Upper Case letters eg: ABC</label>
            </div>
            <div className='form-group'>
                <input
                    type='checkbox'
                    defaultChecked={formData['lower-case']}
                    onChange={handleChange}
                    name='lower-case'
                />
                <label>Lower Case letters eg: abc</label>
            </div>
            <div className='form-group'>
                <input
                    type='checkbox'
                    defaultChecked={formData['numeric']}
                    onChange={handleChange}
                    name='numeric'
                />
                <label>Numeric characters eg: 123</label>
            </div>
            <div className='form-group'>
                <input
                    type='checkbox'
                    defaultChecked={formData['symbols']}
                    onChange={handleChange}
                    name='symbols'
                />
                <label>Symbols eg: !@#*</label>
            </div>
            {data && <div id='result'>
                <span id='password'>{data}</span>
                <a href='/' onClick={copy} id='copy' class="material-symbols-outlined">content_copy</a>
            </div>}
            <div className='form-group center-horizontal'>
                <button id='submit-button' className='button-styles' onClick={generatePassword} disabled={loadingStatus}>
                    {
                        loadingStatus ? (<div className='loader'></div>) : 'Submit'
                    }
                </button>
                <button id='reset-button' className='button-styles'>Reset</button>
            </div>
        </form >
    );
}

export default Form;
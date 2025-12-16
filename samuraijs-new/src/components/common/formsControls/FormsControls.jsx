import React from "react";
import styles from "./FormControls.module.scss";

const Input = ({input, meta, ...props}) => {//пропсы теперь содержат все, кроме инпут и мета
  // debugger
  // console.log(meta)
  return(
    <div className={styles.formControl}>
      <label>
        <input {...input} {...props} className={meta.touched && meta.error ? styles.error : ""} />{/*теперь можно деструктуризировать отдельно инпут, отдельно мета*/}
      </label>
      <span className={styles.errorMessage}>{meta.touched && meta.error && meta.error}</span>
    </div>
  )
}

export default Input;
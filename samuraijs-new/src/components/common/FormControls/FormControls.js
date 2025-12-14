import React from "react";
import styles from "./FormControls.module.scss"

export const Input = ({input, meta, ...props}) => {
  // debugger
  return (
    <div className={`${styles.formControl} ${meta.touched && meta.error ? styles.error : undefined}`}>
      <input {...input} {...props} />
      {meta.touched && meta.error && <span className={styles.errorSpan}>{meta.error}</span>}
    </div>
  )
}

// export const Checkbox = ({input, meta, ...props}) => {
//   // debugger
//   return (
//     <div className={`${styles.formControl} ${meta.touched && meta.error ? styles.error : undefined}`}>
//       <input {...input} {...props} />
//       {meta.touched && meta.error && <span className={styles.errorSpan}>{meta.error}</span>}
//     </div>
//   )
// }
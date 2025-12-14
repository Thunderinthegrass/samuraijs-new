import React, { Component } from 'react';
import style from "./ProfileStatus.module.scss";

export class ProfileStatusClass extends Component {
  state = {
    editMode: false,
    status: this.props.status,
  }

  activateEditMode = () => {
    this.setState({
      editMode: true,
      // status: this.props.status,
    })
  }

  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    if (this.state.status !== this.props.status) {//проверяем, совпадает ли локальный стейт с пропсом, чтобы одно и то же не отправлять
      this.props.updateStatus(this.state.status);
      console.log('Новый статус отправлен!')
    }
  }

  updateStatus = (e) => {
    this.setState({
      status: e.currentTarget.value
    })
  }

  componentDidUpdate(prevProps, prevState) {//обновляем локальный стейт, если он подтянулся в строке 7 уже после монтирования компонента, чтоб value={this.state.status} было не пустым при попытке изменить статус. То же самое я сделал в строке 13, но там обновление стейта происходило при срабатывании функции activateEditMode 
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status
      })
    }
  }

  render() {
    return (
      <div>
        {!this.state.editMode && <span className={style.span} onDoubleClick={this.activateEditMode}>{this.props.status}</span>}
        {this.state.editMode && <div><input className={style.input} type="text" autoFocus onBlur={this.deactivateEditMode} onChange={this.updateStatus} value={this.state.status} placeholder='Введите статус'/></div>}
        {/* <button onClick={() => this.updateStatus3('Статус')}>Жмяк</button> */}
      </div>
    )
  }
}

export default ProfileStatusClass;
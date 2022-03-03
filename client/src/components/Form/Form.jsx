import './Form.css'

const Form = props => {
  return (
    <div className='form-container'>
      <h1>{props.formTitle}</h1>
      <div className='form-wrapper'>
        <form onSubmit={props.handleSubmit}>{props.children}</form>
      </div>
    </div>
  )
}

export default Form

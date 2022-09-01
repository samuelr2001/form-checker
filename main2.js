class ValidaFormulario {
  constructor() {
    this.formulario = document.querySelector('.formulario')
    this.eventos()
  }
  eventos() {
    this.formulario.addEventListener('submit', e => {
      this.handleSubmit(e)
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const checkFields = this.checkFields()
    const validPassword = this.validPassword()
    if (checkFields && validPassword) {
      alert('formulario enviado')
      this.formulario.submit()
    }

  }

  validPassword() {
    let valid = true
    const password = this.formulario.querySelector('.senha')
    const passwordrepeat = this.formulario.querySelector('.repetir-senha')

    if (senha.value !== passwordrepeat) {
      valid = false
      this.createError(password, 'Campos de senha precisam ser iguais')
    }

    if (password.value.length < 6 || pessword.value.length > 12) {
      this.createError(password, 'Senha precisa ter entre 6 e 12 caracteres')
    }


  }


  checkFields() {
    let valid = true

    for (let errortxt of this.formulario.querySelectorAll('.error-txt')) {
      errortxt.remove()
    }

    for (let field of this.formulario.querySelectorAll('.valid')) {
      const label = field.previousElementSibling.innerText
      if (!field.value) {
        this.createError(field, `"${label}" não pode ficar em branco! `)
        valid = false
      }
      if (field.classList.contains('CPF')) {
        if (!this.validaCPF(field)) valid = false
      }

      if (field.classList.contains('usuario')) {
        if (!this.validaUsuario(field)) valid = false
      }


    }
    return valid

  }

  validaUsuario(field) {
    const usuario = field.value
    let valid = true
    if (usuario.length > 12 || usuario.length < 3) {
      this.createError(field, 'O Usuario precisa de ter entre 3 e 12 caracteres')
      valid = false
    }

    if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
      this.createError(field, 'O Usuario precisa conter apenas letra e/ou numeros')
      this.createError(field, 'O Usuario precisa conter apenas letra e/ou numeros')
      valid = false
    }


    return true
  }



  validaCPF(field) {
    const cpf = new ValidaCPF(field.value)
    if (!cpf.valida()) {
      this.createError(field, 'CPF invalido')
      return false
    }
  }

  createError(field, msg) {
    const div = document.createElement('div')
    div.innerHTML = msg
    div.classList.add('error-txt')
    field.insertAdjacentElement('afterend', div)
  }
}

const main = new ValidaFormulario()

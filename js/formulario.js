document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reclamo-form');
    const submitButton = form.querySelector('.primary-button');
    const inputs = form.querySelectorAll('.form-input');

    // Validación de DNI (8 dígitos numéricos)
    function validateDNI(dni) {
        return /^\d{8}$/.test(dni);
    }

    // Validación de teléfono (9 dígitos numéricos que empiezan con 9)
    function validateTelefono(telefono) {
        return /^\d{9}$/.test(telefono);
    }

    // Validación de correo electrónico
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Validación de campos no vacíos
    function validateNotEmpty(value) {
        return value.trim() !== '';
    }

    // Función para validar un campo específico
    function validateField(input) {
        const value = input.value.trim();
        const id = input.id;

        switch(id) {
            case 'dni':
                return validateDNI(value);
            case 'telefono':
                return validateTelefono(value);
            case 'email':
                return validateEmail(value);
            case 'producto':
            case 'nombre':
            case 'mensaje':
                return validateNotEmpty(value);
            default:
                return false;
        }
    }

    // Añadir event listeners de validación en tiempo real
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            // Añadir o quitar clase de error
            if (validateField(this)) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            } else {
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
            }

            // Verificar si todos los campos son válidos
            checkFormValidity();
        });
    });

    // Función para verificar la validez de todo el formulario
    function checkFormValidity() {
        const allFieldsValid = Array.from(inputs).every(input => validateField(input));
        
        if (allFieldsValid) {
            submitButton.disabled = false;
            submitButton.classList.add('btn-enabled');
        } else {
            submitButton.disabled = true;
            submitButton.classList.remove('btn-enabled');
        }
    }

    // Añadir estilos CSS para validación
    const styleTag = document.createElement('style');
    styleTag.textContent = `
        .form-input.is-invalid {
            border-color: red;
            box-shadow: 0 0 0 0.2rem rgba(255, 0, 0, 0.25);
        }
        .form-input.is-valid {
            border-color: green;
            box-shadow: 0 0 0 0.2rem rgba(0, 255, 0, 0.25);
        }
        .primary-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    `;
    document.head.appendChild(styleTag);
});
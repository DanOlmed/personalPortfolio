
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navCollapse = document.getElementById('navbarSupportedContent');
  
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (navCollapse.classList.contains('show')) {
          navCollapse.classList.remove('show');
        }
      });
    });
  });
  
//este codigo sirve para confirmar el envio de mail y hacer que se haga en segundo plano, de esta manera el usuario no es testigo de lo que puede tardar este proceso
  $(document).ready(function() {
    $('#formulario').on('submit', function(event) {
        event.preventDefault(); // Evita el envío del formulario

        // Muestra el modal de "Envío en progreso"
        $('#modalMessage').text('Enviando tu mensaje...');
        $('#confirmationModal').modal('show');

        // Realiza la solicitud AJAX
        $.ajax({
            url: $(this).attr('action'),
            method: 'POST',
            data: $(this).serialize(),
            success: function(response) {
                $('#modalMessage').text('¡Mensaje enviado con éxito!');
            },
            error: function() {
                $('#modalMessage').text('Error al enviar el mensaje. Intenta nuevamente.');
            },
            complete: function() {
                // Vaciar el formulario y esperar un breve momento antes de cerrar el modal
                setTimeout(function() {
                    $('#confirmationModal').modal('hide');
                    $('#formulario')[0].reset();
                }, 2000); // 2 segundos
            }
        });
    });

    // Vaciar el formulario al cerrar el modal
    $('#confirmationModal').on('hidden.bs.modal', function () {
        $('#formulario')[0].reset();
    });
});
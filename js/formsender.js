function submitForm() {
    let form = document.getElementById('feedback-form');

    if (form.checkValidity()) {
        let formData = new FormData(form);

        let xhr = new XMLHttpRequest();
        xhr.open("POST", form.action, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let response = JSON.parse(xhr.responseText);
                    if (response.status === "success") {
                        // Успешный ответ от сервера, выполните дополнительные действия
                        Swal.fire({
                            icon: "success",
                            title: "Успех",
                            text: "Форма успешно отправлена!",
                            confirmButtonColor: '#ec6e18',
                            confirmButtonText: 'Окей'
                        });
                    } else {
                        // Обработка ошибок
                        Swal.fire({
                            icon: "error",
                            title: "Ошибка",
                            text: "Ошибка при отправке формы: " + response.message,
                            confirmButtonColor: '#f24822',
                            confirmButtonText: 'Окей'
                        });
                    }
                } else {
                    // Обработка ошибок
                    Swal.fire({
                        icon: "error",
                        title: "Ошибка",
                        text: "Ошибка при отправке формы. Пожалуйста, попробуйте позже.",
                        confirmButtonColor: '#f24822',
                        confirmButtonText: 'Окей'
                    });
                }
            }
        };

        xhr.send(new URLSearchParams(formData));
    } else {
        form.reportValidity();
    }
}
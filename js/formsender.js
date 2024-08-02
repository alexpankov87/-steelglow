function submitForm(form) {
            if (!form.checkValidity()) {
                Swal.fire({
                    icon: "error",
                    title: "Ошибка",
                    text: "Пожалуйста, заполните все обязательные поля правильно.",
                    confirmButtonColor: '#f24822',
                    confirmButtonText: 'Окей'
                });
                return;
            }

            let formData = new FormData(form);

            let xhr = new XMLHttpRequest();
            xhr.open("POST", form.action, true);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let response = JSON.parse(xhr.responseText);
                        if (response.status === "success") {
                            Swal.fire({
                                icon: "success",
                                title: "Успех",
                                text: "Форма успешно отправлена!",
                                confirmButtonColor: '#5fc65d',
                                confirmButtonText: 'Окей'
                            });
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Ошибка",
                                text: "Ошибка при отправке формы: " + response.message,
                                confirmButtonColor: '#f24822',
                                confirmButtonText: 'Окей'
                            });
                        }
                    } else {
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

            let urlEncodedData = new URLSearchParams();
            formData.forEach((value, key) => {
                urlEncodedData.append(key, value);
            });

            xhr.send(urlEncodedData);
        }
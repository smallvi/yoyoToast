        document.getElementById('danger').addEventListener('click', function () {
            yoyoToast.fire({
                type: 'danger',
                title: 'Oh no!',
                message: 'Something went wrong!',
                subtext: '{"message":"The given data was invalid.","errors":{"student_name":["The student name field is required."]}}',
                position: 'top-right'
            });
        });

        document.getElementById('success').addEventListener('click', function () {
            yoyoToast.fire({
                type: 'success',
                title: 'Congratulation!',
                message: 'Updated Successfully',
                timeout: 3000,
                position: 'top-right'
            });
        });

        document.getElementById('info').addEventListener('click', function () {
            yoyoToast.fire({
                type: 'info',
                message: 'Info Yoyo Toast!',
                timeout: 0,
                subtext: '~ Info Yoyo Toast ~',
                position: 'top-right'
            });
        });

        document.getElementById('warning').addEventListener('click', function () {
            yoyoToast.fire({
                type: 'warning',
                message: 'Warning Yoyo Toast!',
                timeout: 0,
                subtext: '~ Warning Yoyo Toast ~',
                position: 'top-right'
            });
        });

        document.getElementById('question').addEventListener('click', function () {
            yoyoToast.fire({
                type: 'question',
                message: 'Question Yoyo Toast!',
                timeout: 3000,
                subtext: '~ Question Yoyo Toast ~',
                position: 'top-right'
            });
        });

        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                yoyoToast.fire({
                    type: 'info',
                    message: `This is message ${i} `,
                    timeout: 5000,
                    position: 'top-left'
                });
            }, i * 500);
        }

        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                yoyoToast.fire({
                    type: 'warning',
                    message: `This is message ${i} `,
                    timeout: 5000,
                    position: 'top-right'
                });
            }, i * 500);
        }


        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                yoyoToast.fire({
                    type: 'success',
                    message: `This is message ${i} `,
                    timeout: 5000,
                    position: 'bottom-left'
                });
            }, i * 500);
        }

        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                yoyoToast.fire({
                    type: 'danger',
                    message: `This is message ${i} `,
                    timeout: 5000,
                    position: 'bottom-right'
                });
            }, i * 500);
        }


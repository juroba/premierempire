const ToastrAction = {
    success(message, title = '') {
        window.toastr.success(message, title)
    },
    info(message, title = '') {
        window.toastr.info(message, title)
    },
    warning(message, title = '') {
        window.toastr.warning(message, title)
    },
    error(message, title = '') {
        window.toastr.error(message, title)
    },
}

export default ToastrAction

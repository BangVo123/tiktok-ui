const { toast } = require('react-toastify');

function status(e, status) {
    if (!status) {
        e.preventDefault();
        toast.warn('User not authenticate');
    }
}

export default status;

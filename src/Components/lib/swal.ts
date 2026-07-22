import Swal from 'sweetalert2'
export const swalTheme = {
  background: 'var(--color-surface)',
  color: 'var(--color-text)',
  confirmButtonColor: 'var(--color-primary)',
  cancelButtonColor: 'var(--color-text-muted)',
  borderRadius: 'var(--radius-lg)',
}


export const swalDangerTheme = {
  ...swalTheme,
  confirmButtonColor: 'var(--color-danger)',
}
export const fireSuccessToast = (title: string) => {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title,
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    background: 'var(--color-surface)',
    color: 'var(--color-text)',
  })
}

export default Swal

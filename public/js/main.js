$(function () {
  if ($('textarea#ta').length) {
    ClassicEditor
      .create(document.querySelector('#ta'))
      .catch(error => {
        console.error(error);
      })
  }

  $('a[data-method=delete]').on('click', (event) => {
    const _this = $(event.target)
    event.preventDefault()
    const question = _this.data('confirm')

    if (!confirm(question)) {
      return false
    }

    const form = document.createElement('form')
    form.method = 'POST'
    form.action = _this.attr('href')

    override = document.createElement('INPUT');
    override.type = 'HIDDEN';
    override.name = '_method';
    override.value = 'DELETE';
    form.appendChild(override);

    document.body.appendChild(form)
    form.submit()
  })
})

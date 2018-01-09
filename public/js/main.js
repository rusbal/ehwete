$(function () {
  if ($('textarea#ta').length) {
    ClassicEditor
      .create(document.querySelector('#ta'))
      .catch(error => {
        console.error(error);
      })
  }
})

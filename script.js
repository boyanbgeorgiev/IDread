const dropzone = document.getElementById('dropzone');
const fileList = document.getElementById('fileList');

dropzone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropzone.classList.add('dragover');
});

dropzone.addEventListener('dragleave', () => {
  dropzone.classList.remove('dragover');
});

dropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropzone.classList.remove('dragover');

  const files = e.dataTransfer.files;
  handleFiles(files);
});

document.getElementById('fileInput').addEventListener('change', (e) => {
  const files = e.target.files;
  handleFiles(files);
});

function handleFiles(files) {
  fileList.innerHTML = '';
  for (const file of files) {
    const listItem = document.createElement('div');
    listItem.classList.add('file-item');
    listItem.textContent = file.name;
    fileList.appendChild(listItem);
  }
}

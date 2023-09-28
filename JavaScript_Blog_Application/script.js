function getBlogPosts() {
  return JSON.parse(localStorage.getItem('blogPosts')) || [];
}
function saveBlogPosts(blogPosts) {
  localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
}
function displayBlogPosts() {
  const blogPostsContainer = document.getElementById('blog-posts');
  blogPostsContainer.innerHTML = '';
  const blogPosts = getBlogPosts();
  blogPosts.forEach(function (post) {
    const postElement = document.createElement('div');
    postElement.className = 'blog-post';
    const titleElement = document.createElement('h3');
    titleElement.textContent = post.title;
    const contentElement = document.createElement('p');
    contentElement.textContent = post.content;
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit-button';
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    editButton.addEventListener('click', function () {
      editBlogPost(post.id);
    });
    deleteButton.addEventListener('click', function () {
      deleteBlogPost(post.id);
    });
    postElement.appendChild(titleElement);
    postElement.appendChild(contentElement);
    postElement.appendChild(editButton);
    postElement.appendChild(deleteButton);
    blogPostsContainer.appendChild(postElement);
  });
}
function addBlogPost(title, content) {
  const blogPosts = getBlogPosts();
  const id = Date.now().toString();
  const newPost = {
    id: id,
    title: title,
    content: content
  };
  blogPosts.push(newPost);
  saveBlogPosts(blogPosts);
  displayBlogPosts();
}
function editBlogPost(postId) {
  const blogPosts = getBlogPosts();
  const postToEdit = blogPosts.find(function (post) {
    return post.id === postId;
  });
  if (postToEdit) {
    const updatedTitle = prompt('Enter the updated title:', postToEdit.title);
    const updatedContent = prompt('Enter the updated content:', postToEdit.content);
    postToEdit.title = updatedTitle;
    postToEdit.content = updatedContent;
    saveBlogPosts(blogPosts);
    displayBlogPosts();
  }
}
function deleteBlogPost(postId) {
  const blogPosts = getBlogPosts();
  const updatedPosts = blogPosts.filter(function (post) {
    return post.id !== postId;
  });
  saveBlogPosts(updatedPosts);
  displayBlogPosts();
}
function handleFormSubmit(event) {
  event.preventDefault();
  const titleInput = document.getElementById('title');
  const contentInput = document.getElementById('content');
  const title = titleInput.value;
  const content = contentInput.value;
  addBlogPost(title, content);
  titleInput.value = '';
  contentInput.value = '';
}
const form = document.getElementById('create-post-form');
form.addEventListener('submit', handleFormSubmit);
displayBlogPosts();
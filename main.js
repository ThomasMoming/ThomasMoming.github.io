// 获取所有带有 class "zoom" 的图片元素
const images = document.querySelectorAll('.zoom');

// 为每个图片添加鼠标悬停和移出事件
images.forEach(img => {
    img.addEventListener('mouseover', () => {
        img.style.transform = 'scale(1.2)';
        const description = img.nextElementSibling;  // 获取图片下面的描述
        if (description) {
            description.style.transform = 'scale(1.2)';  // 描述文本跟随放大
        }
    });

    img.addEventListener('mouseout', () => {
        img.style.transform = 'scale(1)';
        const description = img.nextElementSibling;  // 获取图片下面的描述
        if (description) {
            description.style.transform = 'scale(1)';  // 描述文本恢复原状
        }
    });
});

// 获取所有带有 class "clickable" 的图片元素
const clickableImages = document.querySelectorAll('.clickable');

// 为每个图片添加点击事件
clickableImages.forEach(img => {
    img.addEventListener('click', () => {
        // 获取图片的 data-link 属性并跳转到该链接
        const link = img.getAttribute('data-link');
        console.log('Image clicked, navigating to:', link); // 调试信息
        if (link) {
            window.location.href = link;
        } else {
            console.log('No link found for this image');
        }
    });
});

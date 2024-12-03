// 搜索功能
const searchableContent = [
  {
    title: "认知革命2.0：当AI与人类思维深度融合",
    content:
      "从文字到互联网，每次认知工具的突破都改变了文明进程。当AI与人类思维深度融合，我们将迎来第四次认知革命。",
    link: "blog-posts/blog-post-05-04.html",
  },
  {
    title: "AI插画的实战方法：从风格学习到个性创作",
    content:
      "想知道AI如何表现独特的艺术风格？本文通过实际案例，带你掌握AI风格定制的核心方法。",
    link: "blog-posts/blog-post-05-03.html",
  },
  {
    title: "知识管理的未来：RAG的潜力",
    content:
      "从碎片化到智能化，RAG技术如何重塑我们知识管理方式？探索这个能够理解、连接和创造的智能协作伙伴。",
    link: "blog-posts/blog-post-05-05.html",
  },
  {
    title: "品牌风格模型定制",
    content: "提供高效风格定制，结合AI生成和数据优化，完成品牌插画和营销设计。",
    link: "#capabilities",
  },
  {
    title: "AI辅助开发工具链",
    content: "通过AI工具链优化网站设计与开发，从草图到上线仅需7天。",
    link: "#capabilities",
  },
];

// 搜索功能实现
const searchIcon = document.querySelector(".search-icon");
const searchBox = document.querySelector(".search-box");
const searchInput = document.querySelector(".search-input");
const searchResults = document.querySelector(".search-results");

// 搜索框显示/隐藏控制
searchIcon.addEventListener("click", () => {
  searchBox.classList.toggle("active");
  if (searchBox.classList.contains("active")) {
    searchInput.focus();
  }
});

// 搜索功能
searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  if (!searchTerm) {
    searchResults.innerHTML = "";
    return;
  }

  const filteredResults = searchableContent.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm) ||
      item.content.toLowerCase().includes(searchTerm)
  );

  // 限制显示结果数量
  const limitedResults = filteredResults.slice(0, 5);
  displaySearchResults(limitedResults);
});

// 显示搜索结果
function displaySearchResults(results) {
  if (results.length === 0) {
    searchResults.innerHTML =
      '<div class="search-result-item">没有找到相关内容</div>';
    return;
  }

  searchResults.innerHTML = results
    .map(
      (item) => `
      <div class="search-result-item" onclick="window.location.href='${item.link}'">
        <div class="search-result-title">${item.title}</div>
        <div class="search-result-content">${item.content}</div>
      </div>
    `
    )
    .join("");
}

// 点击页面其他地方关闭搜索框
document.addEventListener("click", (e) => {
  if (
    !e.target.closest(".search-container") &&
    !e.target.closest(".search-box")
  ) {
    searchBox.classList.remove("active");
    searchResults.innerHTML = "";
    searchInput.value = "";
  }
});

// ESC键关闭搜索框
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    searchBox.classList.remove("active");
    searchResults.innerHTML = "";
    searchInput.value = "";
  }
});

// 模态框功能
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeBtn = document.getElementsByClassName("modal-close")[0];

// 为所有gallery图片添加点击事件
document.querySelectorAll(".masonry-item img").forEach((img) => {
  img.onclick = function () {
    modal.style.display = "flex";
    modalImg.src = this.src;
  };
});

// 点击关闭按钮关闭模态框
closeBtn.onclick = function () {
  modal.style.display = "none";
};

// 点击模态框背景关闭模态框
modal.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// 按ESC关闭模态框
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && modal.style.display === "flex") {
    modal.style.display = "none";
  }
});

// 汉堡菜单功能
const hamburger = document.querySelector(".hamburger");
const mobileNav = document.querySelector(".mobile-nav");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-links a");

// 切换菜单状态
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileNav.classList.toggle("active");
});

// 点击链接时关闭菜单
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileNav.classList.remove("active");
  });
});

// 点击页面其他地方关闭菜单
document.addEventListener("click", (e) => {
  if (!e.target.closest(".hamburger") && !e.target.closest(".mobile-nav")) {
    hamburger.classList.remove("active");
    mobileNav.classList.remove("active");
  }
});

// Gallery 控制
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".gallery-track");
  const slides = Array.from(document.querySelectorAll(".gallery-slide"));
  const nextButton = document.querySelector(".next-button");
  const prevButton = document.querySelector(".prev-button");

  let currentIndex = 0;

  // 根据屏幕宽度决定显示数量
  function getSlidesPerView() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    if (window.innerWidth <= 1200) return 3;
    return 4;
  }

  let slidesPerView = getSlidesPerView();
  let maxIndex = Math.max(0, slides.length - slidesPerView);

  let isAnimating = false; // 防止动画过程中重复触发

  function updateSlidePosition(smooth = true) {
    if (smooth) {
      track.style.transition =
        "transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)";
    } else {
      track.style.transition = "none";
    }

    const offset = (100 / slidesPerView) * currentIndex;
    requestAnimationFrame(() => {
      track.style.transform = `translateX(-${offset}%)`;
    });
  }

  function moveToSlide(index, smooth = true) {
    if (isAnimating) return;
    isAnimating = true;

    currentIndex = Math.min(Math.max(0, index), maxIndex);
    updateSlidePosition(smooth);

    // 动画结束后重置状态
    setTimeout(() => {
      isAnimating = false;
    }, 600);
  }

  nextButton.addEventListener("click", () => {
    moveToSlide(currentIndex + 1);
  });

  prevButton.addEventListener("click", () => {
    moveToSlide(currentIndex - 1);
  });

  // 添加触摸滑动支持
  let touchStartX = 0;
  let touchEndX = 0;
  let initialOffset = 0;

  track.addEventListener("touchstart", (e) => {
    if (isAnimating) return;

    touchStartX = e.touches[0].clientX;
    initialOffset = -(100 / slidesPerView) * currentIndex;

    // 取消过渡效果，实现即时跟随
    track.style.transition = "none";
  });
  track.addEventListener("touchmove", (e) => {
    if (isAnimating) return;

    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX;
    const newOffset = initialOffset + (diff / track.offsetWidth) * 100;

    // 添加阻尼效果
    if (
      (currentIndex === 0 && diff > 0) ||
      (currentIndex === maxIndex && diff < 0)
    ) {
      track.style.transform = `translateX(${newOffset * 0.3}%)`;
    } else {
      track.style.transform = `translateX(${newOffset}%)`;
    }
  });

  track.addEventListener("touchend", (e) => {
    if (isAnimating) return;

    touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    // 恢复过渡效果
    track.style.transition =
      "transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)";

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        moveToSlide(currentIndex + 1);
      } else {
        moveToSlide(currentIndex - 1);
      }
    } else {
      // 回弹到原位
      moveToSlide(currentIndex);
    }
  });

  // 修改窗口大小变化监听
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const newSlidesPerView = getSlidesPerView();
      if (newSlidesPerView !== slidesPerView) {
        slidesPerView = newSlidesPerView;
        maxIndex = Math.max(0, slides.length - slidesPerView);
        currentIndex = Math.min(currentIndex, maxIndex);
        updateSlidePosition();
      }
    }, 250);
  });

  // 添加键盘控制
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      moveToSlide(currentIndex - 1);
    } else if (e.key === "ArrowRight") {
      moveToSlide(currentIndex + 1);
    }
  });
});

// 其余所有JavaScript代码...

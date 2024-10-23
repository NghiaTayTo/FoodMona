interface ProductDescription {
    type: 'text' | 'image';
    content: string;
}

interface Category {
    url: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    main_image: string;
    description_image: string[];
    price: number;
    price_sale: number;
    quantity: number;
    category: string[];
    isNew: boolean;
    isPromotion: boolean;
    isBestSeller: boolean;
    description: ProductDescription[];
}

// Hàm fetchProducts với tham số start và end
async function fetchProducts(
    limit: number,
    filterType: 'new' | 'promotion' | 'bestSeller' | 'all',
    start?: number,
    end?: number
): Promise<Product[]> {

    let url = `http://localhost:3000/products?_limit=${limit}`;

    if (filterType === 'new') {
        url += `&isNew=true`;
    }
    else if (filterType === 'promotion') {
        url += `&isPromotion=true`;
    }
    else if (filterType === 'bestSeller') {
        url += `&isBestSeller=true`;
    }

    if (start !== undefined && end !== undefined) {
        url += `&_start=${start}&_end=${end}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data: Product[] = await response.json();
    return data;
}

// lấy 8 sản phẩm mới nhất
fetchProducts(8, 'new', 0, 8)
    .then(products => {
        renderNewProducts(products);
        initProductInteractions();
    })
    .catch(error => {
        console.error('Error fetching products:', error);
    });

// lấy ra 10 sản phẩm mới nhất
fetchProducts(10, 'new', 8, 20)
    .then(products => {
        renderNewProducts2(products);
        initProductInteractions();
    })
    .catch(error => {
        console.error('Error fetching products:', error);
    });

// * Lấy ra 10 sản phẩm bán chạy nhất
fetchProducts(10, 'bestSeller')
    .then(products => {
        renderBestSellerProducts(products);
        initProductInteractions();
    })
    .catch(error => {
        console.error('Error fetching products:', error);
    });

// * Lấy ra 10 sản phẩm bán chạy nhất
fetchProducts(10, 'promotion')
    .then(products => {
        renderPromotionProducts(products);
        initProductInteractions();
    })
    .catch(error => {
        console.error('Error fetching products:', error);
    });

// load sản phẩm mới nhất lên giapo diện
function renderNewProducts(products: Product[]) {
    const container = document.getElementById('new-product');
    if (container) {
        container.innerHTML = ''; // Xóa nội dung cũ
        let productCardsHTML = '';
        products.forEach(product => {
            productCardsHTML += `
                <div class="product-card">
                    <div class="product-card_img">
                        <a href="">
                            <img src="${product.main_image}" alt="${product.name}">
                        </a>
                    </div>
                    <div class="product-card_info">
                        <h5>${product.name}</h5>
                        
                        <div>
                            ${product.price_sale > 0 ? `
                            <p>${Number(product.price - (product.price_sale * product.price / 100)).toLocaleString('vi')}₫</p>
                            <del>${Number(product.price).toLocaleString('vi')}₫</del>
                            ` : `
                            <p>${Number(product.price).toLocaleString('vi')}₫</p>
                            `}
                        </div>

                        <a href="">MUA NGAY</a>
                    </div>
                    
                    ${product.price_sale > 0 ? `<div class="product-card-sale"><p>-${product.price_sale} %</p></div>` : ''}
                    
                    <div class="product-card_icon">
                        <button data-bs-toggle="tooltip" placement="top" data-bs-custom-class="custom-tooltip"
                            title="Thêm vào giỏ hàng">
                            <i class="fa-solid fa-cart-plus"></i>
                        </button>

                        <button class="show-xemnhanh" data-bs-toggle="tooltip" placement="top"
                            data-bs-custom-class="custom-tooltip" title="Xem sản phẩm">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>

                        <button data-bs-toggle="tooltip" placement="top" data-bs-custom-class="custom-tooltip"
                            title="Thêm vào yêu thích">
                            <i class="fa-solid fa-heart"></i>
                        </button>
                    </div>
                </div>
                `;
            container.innerHTML = productCardsHTML;
        });
    }
}

function renderNewProducts2(products: Product[]) {
    const container = document.getElementById('new-products2');
    if (container) {
        container.innerHTML = ''; // Xóa nội dung cũ
        let productCardsHTML = '';
        products.forEach(product => {
            productCardsHTML += `
                <div class="vegetables-item">
                        <div class="vegetables-item_img">
                            <a href="">
                                <img src="${product.main_image}" alt="${product.name}">
                            </a>
                        </div>
                        <div class="vegetables-item_info">
                            <a href="" class="vegetables-item_name">${product.name}</a>
                            <div class="vegetables-item_price">
                            ${product.price_sale > 0 ? `
                            <p>${Number(product.price - (product.price_sale * product.price / 100)).toLocaleString('vi')}₫</p>
                            <del>${Number(product.price).toLocaleString('vi')}₫</del>
                            ` : `
                            <p>${Number(product.price).toLocaleString('vi')}₫</p>
                            `}
                        </div>
                        </div>
                        <div class="vegetables-item_kilo">
                            <div class="vegetables-item_kilo--active">
                                <p>250</p>
                                <span>G</span>
                            </div>
                            <div>
                                <p>500</p>
                                <span>G</span>
                            </div>
                            <div>
                                <p>1</p>
                                <span>KG</span>
                            </div>
                            <div>
                                <p>1.5</p>
                                <span>KG</span>
                            </div>
                            <div>
                                <p>2</p>
                                <span>KG</span>
                            </div>
                        </div>
                        ${product.price_sale > 0 ? `<div class="vegetables-item_sale">
                            -12%
                        </div>` : ''}
                        
                        <div class="vegetables-item_heart" data-bs-toggle="tooltip" placement="top"
                            data-bs-custom-class="custom-tooltip" title="Yêu thích">
                            <i class="fa-solid fa-heart"></i>
                        </div>
                        <div class="vegetables-item_icon">
                            <button class="vegetables-item_icon--add" data-bs-toggle="tooltip" placement="top"
                                data-bs-custom-class="custom-tooltip" title="Thêm vào giỏ hàng"><i
                                    class="fa-solid fa-plus"></i></button>
                            <button class="show-xemnhanh vegetables-item_icon--eye" data-bs-toggle="tooltip" placement="top"
                                data-bs-custom-class="custom-tooltip" title="Xem nhanh"><i
                                    class="fa-regular fa-eye"></i></button>
                        </div>
                    </div>
                `;
            container.innerHTML = productCardsHTML;
        });
    }
}

function renderBestSellerProducts(products: Product[]) {
    const container = document.getElementById('bestseller-products');
    if (container) {
        container.innerHTML = ''; // Xóa nội dung cũ
        let productCardsHTML = '';
        products.forEach(product => {
            productCardsHTML += `
                <div class="vegetables-item">
                        <div class="vegetables-item_img">
                            <a href="">
                                <img src="${product.main_image}" alt="${product.name}">
                            </a>
                        </div>
                        <div class="vegetables-item_info">
                            <a href="" class="vegetables-item_name">${product.name}</a>
                            <div class="vegetables-item_price">
                            ${product.price_sale > 0 ? `
                            <p>${Number(product.price - (product.price_sale * product.price / 100)).toLocaleString('vi')}₫</p>
                            <del>${Number(product.price).toLocaleString('vi')}₫</del>
                            ` : `
                            <p>${Number(product.price).toLocaleString('vi')}₫</p>
                            `}
                        </div>
                        </div>
                        <div class="vegetables-item_kilo">
                            <div class="vegetables-item_kilo--active">
                                <p>250</p>
                                <span>G</span>
                            </div>
                            <div>
                                <p>500</p>
                                <span>G</span>
                            </div>
                            <div>
                                <p>1</p>
                                <span>KG</span>
                            </div>
                            <div>
                                <p>1.5</p>
                                <span>KG</span>
                            </div>
                            <div>
                                <p>2</p>
                                <span>KG</span>
                            </div>
                        </div>
                        ${product.price_sale > 0 ? `<div class="vegetables-item_sale">
                            -12%
                        </div>` : ''}
                        
                        <div class="vegetables-item_heart" data-bs-toggle="tooltip" placement="top"
                            data-bs-custom-class="custom-tooltip" title="Yêu thích">
                            <i class="fa-solid fa-heart"></i>
                        </div>
                        <div class="vegetables-item_icon">
                            <button class="vegetables-item_icon--add" data-bs-toggle="tooltip" placement="top"
                                data-bs-custom-class="custom-tooltip" title="Thêm vào giỏ hàng"><i
                                    class="fa-solid fa-plus"></i></button>
                            <button class="show-xemnhanh vegetables-item_icon--eye" data-bs-toggle="tooltip" placement="top"
                                data-bs-custom-class="custom-tooltip" title="Xem nhanh"><i
                                    class="fa-regular fa-eye"></i></button>
                        </div>
                    </div>
                `;
            container.innerHTML = productCardsHTML;
        });
    }
}

function renderPromotionProducts(products: Product[]) {
    const container = document.getElementById('promotion-products');
    if (container) {
        container.innerHTML = ''; // Xóa nội dung cũ
        let productCardsHTML = '';
        products.forEach(product => {
            productCardsHTML += `
                <div class="vegetables-item">
                        <div class="vegetables-item_img">
                            <a href="">
                                <img src="${product.main_image}" alt="${product.name}">
                            </a>
                        </div>
                        <div class="vegetables-item_info">
                            <a href="" class="vegetables-item_name">${product.name}</a>
                            <div class="vegetables-item_price">
                            ${product.price_sale > 0 ? `
                            <p>${Number(product.price - (product.price_sale * product.price / 100)).toLocaleString('vi')}₫</p>
                            <del>${Number(product.price).toLocaleString('vi')}₫</del>
                            ` : `
                            <p>${Number(product.price).toLocaleString('vi')}₫</p>
                            `}
                        </div>
                        </div>
                        <div class="vegetables-item_kilo">
                            <div class="vegetables-item_kilo--active">
                                <p>250</p>
                                <span>G</span>
                            </div>
                            <div>
                                <p>500</p>
                                <span>G</span>
                            </div>
                            <div>
                                <p>1</p>
                                <span>KG</span>
                            </div>
                            <div>
                                <p>1.5</p>
                                <span>KG</span>
                            </div>
                            <div>
                                <p>2</p>
                                <span>KG</span>
                            </div>
                        </div>
                        ${product.price_sale > 0 ? `<div class="vegetables-item_sale">
                            -12%
                        </div>` : ''}
                        
                        <div class="vegetables-item_heart" data-bs-toggle="tooltip" placement="top"
                            data-bs-custom-class="custom-tooltip" title="Yêu thích">
                            <i class="fa-solid fa-heart"></i>
                        </div>
                        <div class="vegetables-item_icon">
                            <button class="vegetables-item_icon--add" data-bs-toggle="tooltip" placement="top"
                                data-bs-custom-class="custom-tooltip" title="Thêm vào giỏ hàng"><i
                                    class="fa-solid fa-plus"></i></button>
                            <button class="show-xemnhanh vegetables-item_icon--eye" data-bs-toggle="tooltip" placement="top"
                                data-bs-custom-class="custom-tooltip" title="Xem nhanh"><i
                                    class="fa-regular fa-eye"></i></button>
                        </div>
                    </div>
                `;
            container.innerHTML = productCardsHTML;
        });
    }
}

function initProductInteractions(): void {
    // Khởi tạo tất cả các tooltips
    const tooltipTriggerList = Array.from(document.querySelectorAll<HTMLElement>('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // * Show and close xemnhanh
    const closeButton = document.querySelector<HTMLButtonElement>('.xemnhanh-btn-close');
    const viewBlack = document.querySelector<HTMLElement>('.view-black');
    const showXemNhanhButtons = document.querySelectorAll<HTMLButtonElement>('.show-xemnhanh');

    window.onscroll = function (): void {
        const button: HTMLElement | null = document.querySelector('.to-header');

        if (button) {
            if (document.documentElement.scrollTop > 500) {
                button.classList.add('to-header-active');
            } else {
                button.classList.remove('to-header-active');
            }
        }
    };


    // Close button
    if (closeButton && viewBlack) {
        closeButton.addEventListener('click', function () {
            viewBlack.classList.add('closing');
            setTimeout(function () {
                viewBlack.classList.add('hidden');
                viewBlack.classList.remove('closing');
            }, 500);
        });
    }

    // Show buttons
    showXemNhanhButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            if (viewBlack) {
                viewBlack.classList.remove('hidden');
            }
        });
    });
}


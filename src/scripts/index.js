var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Hàm fetchProducts với tham số start và end
function fetchProducts(limit, filterType, start, end) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "http://localhost:3000/products?_limit=".concat(limit);
                    if (filterType === 'new') {
                        url += "&isNew=true";
                    }
                    else if (filterType === 'promotion') {
                        url += "&isPromotion=true";
                    }
                    else if (filterType === 'bestSeller') {
                        url += "&isBestSeller=true";
                    }
                    if (start !== undefined && end !== undefined) {
                        url += "&_start=".concat(start, "&_end=").concat(end);
                    }
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    });
}
// lấy 8 sản phẩm mới nhất
fetchProducts(8, 'new', 1, 8)
    .then(function (products) {
    renderNewProducts(products);
})
    .catch(function (error) {
    console.error('Error fetching products:', error);
});
// load sản phẩm mới nhất lên giapo diện
function renderNewProducts(products) {
    var container = document.getElementById('new-product');
    if (container) {
        container.innerHTML = ''; // Xóa nội dung cũ
        var productCardsHTML_1 = '';
        products.forEach(function (product) {
            productCardsHTML_1 += "\n                    <div class=\"product-card\">\n                    <div class=\"product-card_img\">\n                        <a href=\"\">\n                            <img src=\"".concat(product.main_image, "\" alt=\"").concat(product.name, "\">\n                        </a>\n                    </div>\n                    <div class=\"product-card_info\">\n                        <h5>").concat(product.name, "</h5>\n                        \n                        <div>\n                            ").concat(product.price_sale > 0 ? "\n                            <p>".concat(product.price_sale * product.price / 100, "\u20AB</p>\n                            <del>").concat(product.price, "\u20AB</del>\n                            ") : "\n                            <p>Price: ".concat(product.price, "\u20AB</p>\n                            "), "\n                        </div>\n\n                        <a href=\"\">MUA NGAY</a>\n                    </div>\n                    \n                    ").concat(product.price_sale > 0 ? "<div class=\"product-card-sale\"><p>-".concat(product.price_sale, " %</p></div>") : '', "</div>\n                    \n                    <!-- * hover v\u00E0o hi\u1EC7n ra -->\n                    <div class=\"product-card_icon\">\n\n                        <button data-bs-toggle=\"tooltip\" placement=\"top\" data-bs-custom-class=\"custom-tooltip\"\n                            title=\"Th\u00EAm v\u00E0o gi\u1ECF h\u00E0ng\">\n                            <i class=\"fa-solid fa-cart-plus\"></i>\n                        </button>\n\n                        <button class=\"show-xemnhanh\" data-bs-toggle=\"tooltip\" placement=\"top\"\n                            data-bs-custom-class=\"custom-tooltip\" title=\"Xem s\u1EA3n ph\u1EA9m\">\n                            <i class=\"fa-solid fa-magnifying-glass\"></i>\n                        </button>\n\n                        <button data-bs-toggle=\"tooltip\" placement=\"top\" data-bs-custom-class=\"custom-tooltip\"\n                            title=\"Th\u00EAm v\u00E0o y\u00EAu th\u00EDch\">\n                            <i class=\"fa-solid fa-heart\"></i>\n                        </button>\n\n                    </div>\n                </div>\n                ");
            container.innerHTML = productCardsHTML_1;
        });
    }
}

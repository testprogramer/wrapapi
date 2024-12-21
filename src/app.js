const express = require('express');
const swaggerSetup = require('./swagger');

const app = express();
swaggerSetup(app);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
    console.log('API docs are available at http://localhost:3000/api-docs');
});

/**
 * @swagger
 * /ticker/{ticker}/overview:
 *   get:
 *     summary: Lấy thông tin tổng quan về mã cổ phiếu
 *     description: Trả về thông tin chi tiết về mã cổ phiếu, bao gồm ngành nghề, số lượng cổ đông, phần trăm nước ngoài, và các chỉ số liên quan khác.
 *     parameters:
 *       - in: path
 *         name: ticker
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã cổ phiếu cần lấy thông tin
 *     responses:
 *       200:
 *         description: Thành công, trả về thông tin tổng quan mã cổ phiếu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exchange:
 *                   type: string
 *                   description: Sàn giao dịch của mã cổ phiếu
 *                   example: HOSE
 *                 shortName:
 *                   type: string
 *                   description: Tên ngắn gọn của công ty
 *                   example: Vinhomes
 *                 industryID:
 *                   type: integer
 *                   description: Mã ngành nghề
 *                   example: 336
 *                 industryIDv2:
 *                   type: string
 *                   description: Mã ngành nghề phiên bản 2
 *                   example: "8633"
 *                 industryIdLevel2:
 *                   type: string
 *                   description: Mã ngành nghề cấp 2
 *                   example: "8600"
 *                 industryIdLevel4:
 *                   type: string
 *                   description: Mã ngành nghề cấp 4
 *                   example: "8633"
 *                 industry:
 *                   type: string
 *                   description: Tên ngành nghề (tiếng Việt)
 *                   example: Bất động sản
 *                 industryEn:
 *                   type: string
 *                   description: Tên ngành nghề (tiếng Anh)
 *                   example: Real Estate
 *                 establishedYear:
 *                   type: string
 *                   description: Năm thành lập
 *                   example: "2008"
 *                 noEmployees:
 *                   type: integer
 *                   description: Số lượng nhân viên
 *                   example: 9440
 *                 noShareholders:
 *                   type: integer
 *                   description: Số lượng cổ đông
 *                   example: 31513
 *                 foreignPercent:
 *                   type: number
 *                   format: float
 *                   description: Phần trăm sở hữu của nhà đầu tư nước ngoài
 *                   example: 0.124
 *                 website:
 *                   type: string
 *                   description: Website chính thức của công ty
 *                   example: https://vinhomes.vn/vi
 *                 stockRating:
 *                   type: number
 *                   format: float
 *                   description: Xếp hạng cổ phiếu
 *                   example: 2.6
 *                 deltaInWeek:
 *                   type: number
 *                   format: float
 *                   description: Thay đổi giá cổ phiếu trong tuần
 *                   example: -0.003
 *                 deltaInMonth:
 *                   type: number
 *                   format: float
 *                   description: Thay đổi giá cổ phiếu trong tháng
 *                   example: -0.087
 *                 deltaInYear:
 *                   type: number
 *                   format: float
 *                   description: Thay đổi giá cổ phiếu trong năm
 *                   example: -0.126
 *                 outstandingShare:
 *                   type: number
 *                   description: Số cổ phiếu lưu hành
 *                   example: 4107.4
 *                 issueShare:
 *                   type: number
 *                   description: Số cổ phiếu đã phát hành
 *                   example: 4354.4
 *                 companyType:
 *                   type: string
 *                   description: Loại hình công ty
 *                   example: CT
 *                 ticker:
 *                   type: string
 *                   description: Mã cổ phiếu
 *                   example: VHM
 */
app.get('/ticker/:ticker/overview', async (req, res) => {
    const overview = await get(`https://apipubaws.tcbs.com.vn/tcanalysis/v1/ticker/${req.params.ticker}/overview`);
    res.json(overview);
});

/**
 * @swagger
 * /ticker/{ticker}/stockratio:
 *   get:
 *     summary: Lấy thông tin chỉ số tài chính của mã cổ phiếu
 *     description: Trả về các chỉ số tài chính chi tiết của mã cổ phiếu, bao gồm vốn hóa thị trường, tỷ lệ giá trên lợi nhuận, giá trị tài sản, nợ, và các chỉ số hiệu quả kinh doanh khác.
 *     parameters:
 *       - in: path
 *         name: ticker
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã cổ phiếu cần lấy thông tin
 *     responses:
 *       200:
 *         description: Thành công, trả về các chỉ số tài chính
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 capitalize:
 *                   type: number
 *                   description: Vốn hóa thị trường
 *                   example: 165734
 *                 tradeVolume:
 *                   type: number
 *                   description: Khối lượng giao dịch
 *                   example: 3476862
 *                 priceToEarning:
 *                   type: number
 *                   format: float
 *                   description: Tỷ lệ giá trên lợi nhuận (P/E)
 *                   example: 8.1
 *                 priceToBook:
 *                   type: number
 *                   format: float
 *                   description: Tỷ lệ giá trên giá trị sổ sách (P/B)
 *                   example: 0.8
 *                 valueBeforeEbitda:
 *                   type: number
 *                   format: float
 *                   description: Giá trị trước EBITDA
 *                   example: 15.3
 *                 dividend:
 *                   type: number
 *                   format: float
 *                   description: Tỷ lệ cổ tức
 *                   example: 0
 *                 roe:
 *                   type: number
 *                   format: float
 *                   description: Tỷ suất lợi nhuận trên vốn chủ sở hữu (ROE)
 *                   example: 0.108
 *                 profitGrowthAvarage:
 *                   type: number
 *                   format: float
 *                   description: Tăng trưởng lợi nhuận trung bình
 *                   example: 0.185
 *                 ageOfReceivable:
 *                   type: number
 *                   format: float
 *                   description: Thời gian thu hồi công nợ
 *                   example: 174
 *                 ageOfInventory:
 *                   type: number
 *                   format: float
 *                   description: Thời gian quay vòng hàng tồn kho
 *                   example: 358.9
 *                 payableOnEquity:
 *                   type: number
 *                   format: float
 *                   description: Nợ phải trả trên vốn chủ sở hữu
 *                   example: 1.4
 *                 payableOnEbitda:
 *                   type: number
 *                   format: float
 *                   description: Nợ phải trả trên EBITDA
 *                   example: 3.8
 *                 ebitOnInterest:
 *                   type: number
 *                   format: float
 *                   description: EBIT trên lãi suất vay
 *                   example: 4.7
 *                 shortOnLongTermPayable:
 *                   type: number
 *                   format: float
 *                   description: Nợ ngắn hạn trên nợ dài hạn
 *                   example: 0.5
 *                 revenue:
 *                   type: number
 *                   description: Doanh thu
 *                   example: 78607
 *                 operationProfit:
 *                   type: number
 *                   description: Lợi nhuận hoạt động
 *                   example: 12797
 *                 netProfit:
 *                   type: number
 *                   description: Lợi nhuận ròng
 *                   example: 20467
 *                 earningPerShare:
 *                   type: number
 *                   description: Lợi nhuận trên mỗi cổ phiếu (EPS)
 *                   example: 4983
 *                 asset:
 *                   type: number
 *                   description: Tổng tài sản
 *                   example: 524684
 *                 liability:
 *                   type: number
 *                   description: Tổng nợ phải trả
 *                   example: 308719
 *                 equity:
 *                   type: number
 *                   description: Vốn chủ sở hữu
 *                   example: 215966
 *                 bookValuePerShare:
 *                   type: number
 *                   description: Giá trị sổ sách trên mỗi cổ phiếu
 *                   example: 48724
 *                 profitMargin:
 *                   type: number
 *                   format: float
 *                   nullable: true
 *                   description: Biên lợi nhuận
 *                   example: null
 *                 nonInterestOnToi:
 *                   type: number
 *                   format: float
 *                   nullable: true
 *                   description: Tỷ lệ thu nhập không lãi
 *                   example: null
 *                 loanOnDeposit:
 *                   type: number
 *                   format: float
 *                   nullable: true
 *                   description: Tỷ lệ cho vay trên tiền gửi
 *                   example: null
 *                 creditGrowth:
 *                   type: number
 *                   format: float
 *                   nullable: true
 *                   description: Tăng trưởng tín dụng
 *                   example: null
 *                 badDebtPercentage:
 *                   type: number
 *                   format: float
 *                   nullable: true
 *                   description: Tỷ lệ nợ xấu
 *                   example: null
 *                 provisionOnBadDebt:
 *                   type: number
 *                   format: float
 *                   nullable: true
 *                   description: Dự phòng nợ xấu
 *                   example: null
 *                 customerCredit:
 *                   type: number
 *                   format: float
 *                   nullable: true
 *                   description: Tín dụng khách hàng
 *                   example: null
 *                 betaIndex:
 *                   type: number
 *                   format: float
 *                   nullable: true
 *                   description: Chỉ số beta
 *                   example: null
 *                 ticker:
 *                   type: string
 *                   description: Mã cổ phiếu
 *                   example: VHM
 */
app.get('/ticker/:ticker/stockratio', async (req, res) => {
    const stockratio = await get(`https://apipubaws.tcbs.com.vn/tcanalysis/v1/ticker/${req.params.ticker}/stockratio`);
    res.json(stockratio);
});

/**
 * @swagger
 * /ticker/{ticker}/stock-same-ind:
 *   get:
 *     summary: Lấy danh sách cổ phiếu cùng ngành
 *     description: Trả về danh sách các cổ phiếu có cùng ngành với mã cổ phiếu đã chỉ định, bao gồm các thông tin như độ tương quan, chỉ số beta, P/E, tỷ lệ nắm giữ và đánh giá cổ phiếu.
 *     parameters:
 *       - in: path
 *         name: ticker
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã cổ phiếu cần lấy danh sách cùng ngành
 *     responses:
 *       200:
 *         description: Thành công, trả về danh sách cổ phiếu cùng ngành
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 value:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       correlation:
 *                         type: number
 *                         format: float
 *                         description: Độ tương quan với cổ phiếu chính
 *                         example: 0.554
 *                       beta:
 *                         type: number
 *                         format: float
 *                         description: Chỉ số beta
 *                         example: 0.559
 *                       pe:
 *                         type: number
 *                         format: float
 *                         description: Tỷ lệ giá trên lợi nhuận (P/E)
 *                         example: 16.212
 *                       vni1m:
 *                         type: number
 *                         format: float
 *                         description: Biến động trong 1 tháng so với VN-Index
 *                         example: -0.04
 *                       vni3m:
 *                         type: number
 *                         format: float
 *                         description: Biến động trong 3 tháng so với VN-Index
 *                         example: -0.045
 *                       vni6m:
 *                         type: number
 *                         format: float
 *                         description: Biến động trong 6 tháng so với VN-Index
 *                         example: -0.007
 *                       countHolding:
 *                         type: integer
 *                         description: Số lượng nhà đầu tư nắm giữ cổ phiếu
 *                         example: 8725
 *                       percentHoling:
 *                         type: number
 *                         format: float
 *                         description: Tỷ lệ nắm giữ cổ phiếu
 *                         example: 0.052
 *                       companyName:
 *                         type: string
 *                         description: Tên công ty
 *                         example: VinGroup Joint Stock Company
 *                       industryName:
 *                         type: string
 *                         description: Ngành công nghiệp
 *                         example: Real Estate
 *                       exchangeName:
 *                         type: string
 *                         description: Sàn giao dịch
 *                         example: HOSE
 *                       stockRating:
 *                         type: number
 *                         format: float
 *                         description: Đánh giá cổ phiếu
 *                         example: 1.971
 *                       ticker:
 *                         type: string
 *                         description: Mã cổ phiếu
 *                         example: VIC
 */
app.get('/ticker/:ticker/stock-same-ind', async (req, res) => {
    const sameInd = await get(`https://apipubaws.tcbs.com.vn/tcanalysis/v1/ticker/${req.params.ticker}/stock-same-ind`);
    res.json(sameInd);
});

/**
 * @swagger
 * /ticker/{ticker}/indicator:
 *   get:
 *     summary: Lấy các chỉ báo kỹ thuật của cổ phiếu
 *     description: Trả về danh sách các chỉ báo kỹ thuật của mã cổ phiếu được chỉ định, bao gồm giá đóng cửa, SMA, Bollinger Bands, MACD, RSI, ADX và các chỉ báo khác.
 *     parameters:
 *       - in: path
 *         name: ticker
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã cổ phiếu cần lấy chỉ báo kỹ thuật
 *     responses:
 *       200:
 *         description: Thành công, trả về danh sách chỉ báo kỹ thuật
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 listTechnicalIndicator:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ticker:
 *                         type: string
 *                         description: Mã cổ phiếu
 *                         example: VHM
 *                       closePrice:
 *                         type: number
 *                         description: Giá đóng cửa
 *                         example: 43750
 *                       sma5:
 *                         type: number
 *                         description: Đường trung bình động đơn giản (SMA) 5 ngày
 *                         example: 43510
 *                       sma20:
 *                         type: number
 *                         description: Đường trung bình động đơn giản (SMA) 20 ngày
 *                         example: 42398
 *                       upper:
 *                         type: number
 *                         description: Giới hạn trên của Bollinger Bands
 *                         example: 45233
 *                       lower:
 *                         type: number
 *                         description: Giới hạn dưới của Bollinger Bands
 *                         example: 39562
 *                       macd:
 *                         type: number
 *                         description: Chỉ báo MACD
 *                         example: 1.307
 *                       macdema:
 *                         type: number
 *                         description: Đường trung bình động MACD
 *                         example: 1.3094
 *                       macdhist:
 *                         type: number
 *                         description: Histogram của MACD
 *                         example: -0.0024
 *                       stochk:
 *                         type: number
 *                         description: Chỉ số Stochastic %K
 *                         example: 66.27
 *                       stochd:
 *                         type: number
 *                         description: Chỉ số Stochastic %D
 *                         example: 72.11
 *                       rsi:
 *                         type: number
 *                         description: Chỉ số RSI (Relative Strength Index)
 *                         example: 64.44
 *                       adx:
 *                         type: number
 *                         description: Chỉ số ADX (Average Directional Index)
 *                         example: 36.5
 *                       dateReport:
 *                         type: string
 *                         format: date
 *                         description: Ngày báo cáo
 *                         example: 20/09/2024
 */
app.get('/ticker/:ticker/indicator', async (req, res) => {
    const indicator = await get(`https://apipubaws.tcbs.com.vn/tcanalysis/v1/data-charts/indicator?ticker=${req.params.ticker}`);
    res.json(indicator);
});

/**
 * @swagger
 * /ticker/{ticker}/fundamental-analysis:
 *   get:
 *     summary: Phân tích cơ bản và kỹ thuật của cổ phiếu
 *     description: Trả về phân tích cơ bản và kỹ thuật của mã cổ phiếu chỉ định, bao gồm khuyến nghị đầu tư, nhận xét chi tiết và dữ liệu phân tích tài chính.
 *     parameters:
 *       - in: path
 *         name: ticker
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã cổ phiếu cần phân tích
 *     responses:
 *       200:
 *         description: Thành công, trả về phân tích cơ bản và kỹ thuật
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           ticker:
 *                             type: string
 *                             description: Mã cổ phiếu
 *                             example: VHM
 *                           reportDate:
 *                             type: string
 *                             description: Kỳ báo cáo
 *                             example: Quý 3/2024
 *                           recommendation:
 *                             type: string
 *                             description: Khuyến nghị đầu tư
 *                             example: "<br>Dựa trên phân tích cơ bản, tôi khuyến nghị NẮM GIỮ cổ phiếu này."
 *                           analysis:
 *                             type: string
 *                             description: Phân tích chi tiết (cơ bản hoặc kỹ thuật)
 *                             example: "<br>Tỷ lệ P/E hiện tại của cổ phiếu là 8,16, thấp hơn đáng kể so với các mức trong quá khứ."
 *                           type:
 *                             type: string
 *                             description: Loại phân tích (cơ bản hoặc kỹ thuật)
 *                             enum: [fundamental, technical]
 *                             example: fundamental
 */
app.get('/ticker/:ticker/fundamental-analysis', async (req, res) => {
    const fundamental_analysis = await get(`https://apipubaws.tcbs.com.vn/tcbs-hfc-data/v1/ani/fundamental-analysis?ticker=${req.params.ticker}`);
    res.json(fundamental_analysis);
});

/**
 * @swagger
 * /ticker/{ticker}/dividend-payment-histories:
 *   get:
 *     summary: Lịch sử chi trả cổ tức
 *     description: Trả về danh sách lịch sử chi trả cổ tức của mã cổ phiếu được chỉ định, bao gồm ngày thực hiện, tỷ lệ chi trả và phương thức phát hành.
 *     parameters:
 *       - in: path
 *         name: ticker
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã cổ phiếu cần xem lịch sử chi trả cổ tức
 *     responses:
 *       200:
 *         description: Thành công, trả về danh sách lịch sử chi trả cổ tức
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 listDividendPaymentHis:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       exerciseDate:
 *                         type: string
 *                         description: Ngày thực hiện
 *                         example: "17/08/21"
 *                       cashYear:
 *                         type: integer
 *                         description: Năm chi trả cổ tức
 *                         example: 2021
 *                       cashDividendPercentage:
 *                         type: number
 *                         format: float
 *                         description: Tỷ lệ chi trả cổ tức bằng tiền mặt
 *                         example: 0.125
 *                       issueMethod:
 *                         type: string
 *                         description: Phương thức phát hành cổ tức (tiền mặt hoặc cổ phiếu)
 *                         example: "share"
 *                       no:
 *                         type: integer
 *                         description: Số thứ tự đợt chi trả
 *                         example: 1
 *                       ticker:
 *                         type: string
 *                         description: Mã cổ phiếu
 *                         example: "VIC"
 */
app.get('/ticker/:ticker/dividend-payment-histories', async (req, res) => {
    const dividend = await get(`https://apipubaws.tcbs.com.vn/tcanalysis/v1/company/${req.params.ticker}/dividend-payment-histories?page=0&size=500`);
    res.json(dividend);
});

/**
 * @swagger
 * /ticker/{ticker}/incomestatement:
 *   get:
 *     summary: Báo cáo thu nhập
 *     description: Lấy thông tin báo cáo thu nhập của một mã cổ phiếu, bao gồm các chỉ số tài chính như doanh thu, lợi nhuận gộp, chi phí hoạt động, và lợi nhuận sau thuế.
 *     parameters:
 *       - in: path
 *         name: ticker
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã cổ phiếu cần xem báo cáo thu nhập
 *       - in: query
 *         name: yearly
 *         required: false
 *         schema:
 *           type: integer
 *           enum: [0, 1]
 *         description: Lựa chọn hiển thị theo năm (1) hoặc theo quý (0)
 *       - in: query
 *         name: isAll
 *         required: false
 *         schema:
 *           type: boolean
 *         description: Nếu `true`, trả về tất cả dữ liệu; nếu `false`, trả về dữ liệu gần nhất
 *     responses:
 *       200:
 *         description: Thành công, trả về thông tin báo cáo thu nhập
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ticker:
 *                     type: string
 *                     description: Mã cổ phiếu
 *                     example: "VHM"
 *                   quarter:
 *                     type: integer
 *                     description: Quý báo cáo
 *                     example: 3
 *                   year:
 *                     type: integer
 *                     description: Năm báo cáo
 *                     example: 2024
 *                   revenue:
 *                     type: number
 *                     description: Doanh thu (tỷ đồng)
 *                     example: 33323
 *                   yearRevenueGrowth:
 *                     type: number
 *                     format: float
 *                     description: Tăng trưởng doanh thu so với cùng kỳ năm trước
 *                     example: 0.018
 *                   quarterRevenueGrowth:
 *                     type: number
 *                     format: float
 *                     description: Tăng trưởng doanh thu so với quý trước
 *                     example: 0.174
 *                   costOfGoodSold:
 *                     type: number
 *                     description: Giá vốn hàng bán (tỷ đồng)
 *                     example: -23572
 *                   grossProfit:
 *                     type: number
 *                     description: Lợi nhuận gộp (tỷ đồng)
 *                     example: 9751
 *                   operationExpense:
 *                     type: number
 *                     description: Chi phí hoạt động (tỷ đồng)
 *                     example: -2737
 *                   operationProfit:
 *                     type: number
 *                     description: Lợi nhuận hoạt động (tỷ đồng)
 *                     example: 7014
 *                   yearOperationProfitGrowth:
 *                     type: number
 *                     format: float
 *                     description: Tăng trưởng lợi nhuận hoạt động so với cùng kỳ năm trước
 *                     example: -0.486
 *                   quarterOperationProfitGrowth:
 *                     type: number
 *                     format: float
 *                     description: Tăng trưởng lợi nhuận hoạt động so với quý trước
 *                     example: 0.011
 *                   interestExpense:
 *                     type: number
 *                     description: Chi phí lãi vay (tỷ đồng)
 *                     example: -1508
 *                   preTaxProfit:
 *                     type: number
 *                     description: Lợi nhuận trước thuế (tỷ đồng)
 *                     example: 10837
 *                   postTaxProfit:
 *                     type: number
 *                     description: Lợi nhuận sau thuế (tỷ đồng)
 *                     example: 8980
 *                   shareHolderIncome:
 *                     type: number
 *                     description: Lợi nhuận thuộc về cổ đông (tỷ đồng)
 *                     example: 7866
 *                   yearShareHolderIncomeGrowth:
 *                     type: number
 *                     format: float
 *                     description: Tăng trưởng lợi nhuận cổ đông so với cùng kỳ năm trước
 *                     example: -0.264
 *                   quarterShareHolderIncomeGrowth:
 *                     type: number
 *                     format: float
 *                     description: Tăng trưởng lợi nhuận cổ đông so với quý trước
 *                     example: -0.278
 *                   ebitda:
 *                     type: number
 *                     description: EBITDA (tỷ đồng)
 *                     example: 7544
 */
app.get('/ticker/:ticker/incomestatement', async (req, res) => {
    const yearly = req.query.yearly || 0;
    const isAll = req.query.isAll || false;
    const incomestatement = await get(`https://apipubaws.tcbs.com.vn/tcanalysis/v1/finance/${req.params.ticker}/incomestatement?yearly=${yearly}&isAll=${isAll}`);
    res.json(incomestatement);
});


/**
 * @swagger
 * /ticker/{ticker}/balancesheet:
 *   get:
 *     summary: Báo cáo bảng cân đối kế toán
 *     description: Lấy thông tin bảng cân đối kế toán của một mã cổ phiếu, bao gồm tài sản, nợ phải trả, vốn chủ sở hữu, và các chỉ số liên quan.
 *     parameters:
 *       - in: path
 *         name: ticker
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã cổ phiếu cần xem báo cáo bảng cân đối kế toán
 *       - in: query
 *         name: yearly
 *         required: false
 *         schema:
 *           type: integer
 *           enum: [0, 1]
 *         description: Lựa chọn hiển thị theo năm (1) hoặc theo quý (0)
 *       - in: query
 *         name: isAll
 *         required: false
 *         schema:
 *           type: boolean
 *         description: Nếu `true`, trả về tất cả dữ liệu; nếu `false`, trả về dữ liệu gần nhất
 *     responses:
 *       200:
 *         description: Thành công, trả về thông tin bảng cân đối kế toán
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ticker:
 *                     type: string
 *                     description: Mã cổ phiếu
 *                     example: "VHM"
 *                   quarter:
 *                     type: integer
 *                     description: Quý báo cáo
 *                     example: 3
 *                   year:
 *                     type: integer
 *                     description: Năm báo cáo
 *                     example: 2024
 *                   shortAsset:
 *                     type: number
 *                     description: Tổng tài sản ngắn hạn (tỷ đồng)
 *                     example: 302730
 *                   cash:
 *                     type: number
 *                     description: Tiền mặt và tương đương tiền (tỷ đồng)
 *                     example: 20621
 *                   shortInvest:
 *                     type: number
 *                     description: Đầu tư ngắn hạn (tỷ đồng)
 *                     example: 3802
 *                   shortReceivable:
 *                     type: number
 *                     description: Các khoản phải thu ngắn hạn (tỷ đồng)
 *                     example: 187109
 *                   inventory:
 *                     type: number
 *                     description: Hàng tồn kho (tỷ đồng)
 *                     example: 57981
 *                   longAsset:
 *                     type: number
 *                     description: Tổng tài sản dài hạn (tỷ đồng)
 *                     example: 221954
 *                   fixedAsset:
 *                     type: number
 *                     description: Tài sản cố định (tỷ đồng)
 *                     example: 17352
 *                   asset:
 *                     type: number
 *                     description: Tổng tài sản (tỷ đồng)
 *                     example: 524684
 *                   debt:
 *                     type: number
 *                     description: Tổng nợ phải trả (tỷ đồng)
 *                     example: 308719
 *                   shortDebt:
 *                     type: number
 *                     description: Nợ ngắn hạn (tỷ đồng)
 *                     example: 24202
 *                   longDebt:
 *                     type: number
 *                     description: Nợ dài hạn (tỷ đồng)
 *                     example: 47969
 *                   equity:
 *                     type: number
 *                     description: Vốn chủ sở hữu (tỷ đồng)
 *                     example: 215966
 *                   capital:
 *                     type: number
 *                     description: Vốn điều lệ (tỷ đồng)
 *                     example: 43544
 *                   otherDebt:
 *                     type: number
 *                     description: Nợ khác (tỷ đồng)
 *                     example: 94713
 *                   minorShareHolderProfit:
 *                     type: number
 *                     description: Lợi nhuận cổ đông thiểu số (tỷ đồng)
 *                     example: 15835
 *                   payable:
 *                     type: number
 *                     description: Tổng số tiền phải trả (tỷ đồng)
 *                     example: 308719
 */
app.get('/ticker/:ticker/balancesheet', async (req, res) => {
    const yearly = req.query.yearly || 0;
    const isAll = req.query.isAll || false;
    const balancesheet = await get(`https://apipubaws.tcbs.com.vn/tcanalysis/v1/finance/${req.params.ticker}/balancesheet?yearly=${yearly}&isAll=${isAll}`);
    res.json(balancesheet);
});

/**
 * @swagger
 * /ticker/{ticker}/cashflow:
 *   get:
 *     summary: Báo cáo lưu chuyển tiền tệ
 *     description: Lấy thông tin báo cáo lưu chuyển tiền tệ của một mã cổ phiếu, bao gồm các dòng tiền từ hoạt động kinh doanh, đầu tư, tài chính, và dòng tiền tự do.
 *     parameters:
 *       - in: path
 *         name: ticker
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã cổ phiếu cần xem báo cáo lưu chuyển tiền tệ
 *       - in: query
 *         name: yearly
 *         required: false
 *         schema:
 *           type: integer
 *           enum: [0, 1]
 *         description: Lựa chọn hiển thị theo năm (1) hoặc theo quý (0)
 *       - in: query
 *         name: isAll
 *         required: false
 *         schema:
 *           type: boolean
 *         description: Nếu `true`, trả về tất cả dữ liệu; nếu `false`, trả về dữ liệu gần nhất
 *     responses:
 *       200:
 *         description: Thành công, trả về thông tin báo cáo lưu chuyển tiền tệ
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ticker:
 *                     type: string
 *                     description: Mã cổ phiếu
 *                     example: "VHM"
 *                   quarter:
 *                     type: integer
 *                     description: Quý báo cáo
 *                     example: 3
 *                   year:
 *                     type: integer
 *                     description: Năm báo cáo
 *                     example: 2024
 *                   investCost:
 *                     type: number
 *                     description: Chi phí đầu tư (tỷ đồng)
 *                     example: -3837
 *                   fromInvest:
 *                     type: number
 *                     description: Dòng tiền từ hoạt động đầu tư (tỷ đồng)
 *                     example: 9027
 *                   fromFinancial:
 *                     type: number
 *                     description: Dòng tiền từ hoạt động tài chính (tỷ đồng)
 *                     example: 2107
 *                   fromSale:
 *                     type: number
 *                     description: Dòng tiền từ hoạt động kinh doanh (tỷ đồng)
 *                     example: -7692
 *                   freeCashFlow:
 *                     type: number
 *                     description: Dòng tiền tự do (tỷ đồng)
 *                     example: 23635
 */
app.get('/ticker/:ticker/cashflow', async (req, res) => {
    const yearly = req.query.yearly || 0;
    const isAll = req.query.isAll || false;
    const cashflow = await get(`https://apipubaws.tcbs.com.vn/tcanalysis/v1/finance/${req.params.ticker}/cashflow?yearly=${yearly}&isAll=${isAll}`);
    res.json(cashflow);
});

/**
 * @swagger
 * /ticker/{ticker}/financialratio:
 *   get:
 *     summary: Báo cáo tỷ lệ tài chính của cổ phiếu
 *     description: Lấy thông tin tỷ lệ tài chính của một mã cổ phiếu, bao gồm các chỉ số như P/E, P/B, ROE, ROA, và các chỉ số tài chính quan trọng khác.
 *     parameters:
 *       - in: path
 *         name: ticker
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã cổ phiếu cần xem tỷ lệ tài chính
 *       - in: query
 *         name: yearly
 *         required: false
 *         schema:
 *           type: integer
 *           enum: [0, 1]
 *         description: Lựa chọn hiển thị theo năm (1) hoặc theo quý (0)
 *       - in: query
 *         name: isAll
 *         required: false
 *         schema:
 *           type: boolean
 *         description: Nếu `true`, trả về tất cả dữ liệu; nếu `false`, trả về dữ liệu gần nhất
 *     responses:
 *       200:
 *         description: Thành công, trả về thông tin tỷ lệ tài chính của cổ phiếu
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ticker:
 *                     type: string
 *                     description: Mã cổ phiếu
 *                     example: "VHM"
 *                   quarter:
 *                     type: integer
 *                     description: Quý báo cáo
 *                     example: 3
 *                   year:
 *                     type: integer
 *                     description: Năm báo cáo
 *                     example: 2024
 *                   priceToEarning:
 *                     type: number
 *                     description: Tỷ lệ giá trên lợi nhuận (P/E)
 *                     example: 8.1
 *                   priceToBook:
 *                     type: number
 *                     description: Tỷ lệ giá trên giá trị sổ sách (P/B)
 *                     example: 0.8
 *                   valueBeforeEbitda:
 *                     type: number
 *                     description: Giá trị trước EBITDA
 *                     example: 15.3
 *                   roe:
 *                     type: number
 *                     description: Tỷ lệ sinh lời trên vốn chủ sở hữu (ROE)
 *                     example: 0.108
 *                   roa:
 *                     type: number
 *                     description: Tỷ lệ sinh lời trên tài sản (ROA)
 *                     example: 0.043
 *                   daysReceivable:
 *                     type: number
 *                     description: Số ngày trung bình thu hồi công nợ
 *                     example: 174
 *                   daysInventory:
 *                     type: number
 *                     description: Số ngày trung bình tồn kho
 *                     example: 359
 *                   daysPayable:
 *                     type: number
 *                     description: Số ngày trung bình thanh toán công nợ
 *                     example: 118
 *                   ebitOnInterest:
 *                     type: number
 *                     description: Tỷ lệ EBIT trên chi phí lãi vay
 *                     example: 4.7
 *                   earningPerShare:
 *                     type: number
 *                     description: Lợi nhuận trên mỗi cổ phiếu (EPS)
 *                     example: 4983
 *                   bookValuePerShare:
 *                     type: number
 *                     description: Giá trị sổ sách trên mỗi cổ phiếu
 *                     example: 48724
 *                   equityOnTotalAsset:
 *                     type: number
 *                     description: Tỷ lệ vốn chủ sở hữu trên tổng tài sản
 *                     example: 0.381
 *                   equityOnLoan:
 *                     type: number
 *                     description: Tỷ lệ vốn chủ sở hữu trên nợ vay
 *                   costToIncome:
 *                     type: number
 *                     description: Tỷ lệ chi phí trên thu nhập
 *                   postTaxMargin:
 *                     type: number
 *                     description: Biên lợi nhuận sau thuế
 *                     example: 0.236
 *                   debtOnEquity:
 *                     type: number
 *                     description: Tỷ lệ nợ trên vốn chủ sở hữu
 *                     example: 0.3
 *                   debtOnAsset:
 *                     type: number
 *                     description: Tỷ lệ nợ trên tài sản
 *                     example: 0.1
 *                   debtOnEbitda:
 *                     type: number
 *                     description: Tỷ lệ nợ trên EBITDA
 *                     example: 3.8
 *                   assetOnEquity:
 *                     type: number
 *                     description: Tỷ lệ tài sản trên vốn chủ sở hữu
 *                     example: 2.6
 *                   capitalBalance:
 *                     type: number
 *                     description: Số dư vốn chủ sở hữu
 *                     example: 56167
 *                   cashOnEquity:
 *                     type: number
 *                     description: Tỷ lệ tiền mặt trên vốn chủ sở hữu
 *                     example: 0.095
 *                   cashOnCapitalize:
 *                     type: number
 *                     description: Tỷ lệ tiền mặt trên tổng vốn hóa
 *                     example: 0.124
 *                   cashCirculation:
 *                     type: number
 *                     description: Lưu chuyển tiền mặt
 *                     example: 415
 *                   revenueOnAsset:
 *                     type: number
 *                     description: Tỷ lệ doanh thu trên tài sản
 *                     example: 0.2
 */
app.get('/ticker/:ticker/financialratio', async (req, res) => {
    const yearly = req.query.yearly || 0;
    const isAll = req.query.isAll || false;
    const financialratio = await get(`https://apipubaws.tcbs.com.vn/tcanalysis/v1/finance/${req.params.ticker}/financialratio?yearly=${yearly}&isAll=${isAll}`);
    res.json(financialratio);
});

/**
 * @swagger
 * /ticker/{ticker}/price:
 *   get:
 *     summary: Lấy thông tin giá cổ phiếu trong một khoảng thời gian
 *     description: Lấy dữ liệu giá cổ phiếu bao gồm giá mở cửa, cao nhất, thấp nhất, đóng cửa và khối lượng giao dịch trong một khoảng thời gian cụ thể.
 *     parameters:
 *       - in: path
 *         name: ticker
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã cổ phiếu cần lấy giá
 *       - in: query
 *         name: endHistoryDate
 *         required: false
 *         schema:
 *           type: integer
 *         description: Thời gian kết thúc trong dạng Unix timestamp. Nếu không có, mặc định lấy dữ liệu mới nhất.
 *       - in: query
 *         name: countBack
 *         required: false
 *         schema:
 *           type: integer
 *           maximum: 365
 *         description: Số lượng bản ghi cần lấy, tối đa 365 bản ghi.
 *     responses:
 *       200:
 *         description: Thành công, trả về dữ liệu giá cổ phiếu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ticker:
 *                   type: string
 *                   description: Mã cổ phiếu
 *                   example: "VHM"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       open:
 *                         type: number
 *                         description: Giá mở cửa
 *                         example: 40000
 *                       high:
 *                         type: number
 *                         description: Giá cao nhất trong phiên
 *                         example: 40850
 *                       low:
 *                         type: number
 *                         description: Giá thấp nhất trong phiên
 *                         example: 39250
 *                       close:
 *                         type: number
 *                         description: Giá đóng cửa
 *                         example: 40600
 *                       volume:
 *                         type: number
 *                         description: Khối lượng giao dịch
 *                         example: 15318398
 *                       tradingDate:
 *                         type: string
 *                         format: date-time
 *                         description: Ngày giao dịch
 *                         example: "2024-11-11T00:00:00.000Z"
 */
app.get('/ticker/:ticker/price', async (req, res) => {
    const today = new Date();
    today.setDate(today.getDate() + 3);
    const endHistoryDate = req.query.endHistoryDate || Math.floor(today.getTime() / 1000);

    const countBack = req.query.countBack || 30;

    const price = await get(`https://apipubaws.tcbs.com.vn/stock-insight/v2/stock/bars-long-term?ticker=${req.params.ticker}&type=stock&resolution=D&to=${endHistoryDate}&countBack=${countBack}`);
    res.json(price);
});

const get = async (url) => {
    try {
        let res = await fetch(url, { headers: { "accept-language": "vi" } });
        let body = await res.json();
        return body;
    } catch {
        return {};
    }
}

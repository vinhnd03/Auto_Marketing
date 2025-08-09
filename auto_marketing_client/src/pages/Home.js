import { useEffect, useState } from "react";
import HeroAnimation from "../components/HeroAnimation";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import AOS from "aos";
import "aos/dist/aos.css";
import bgPattern from "../assets/bermuda-circle.svg";

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#e6f0ff] pt-0 pb-12 md:pb-16" data-aos="fade-up">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-16">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6 text-gray-900">
              Giải pháp{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                AutoMarketing
              </span>{" "}
              cho doanh nghiệp hiện đại
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Tự động hóa quy trình tiếp thị, tăng trưởng doanh thu và cá nhân
              hóa trải nghiệm khách hàng – tất cả chỉ trong một nền tảng duy
              nhất.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/contact"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition"
              >
                Bắt đầu ngay
              </a>
              <a
                href="/features"
                className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Khám phá tính năng
              </a>
            </div>
          </div>
          <HeroAnimation />
        </div>
      </section>

      {/*WHy  Section */}
      <section
        className="relative bg-purple-100 pb-28 pt-20 overflow-hidden"
        data-aos="fade-up"
      >
        {/* Decorative background circles */}
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-yellow-100 rounded-full opacity-30"></div>
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-yellow-100 rounded-full opacity-20"></div>

        <div className="container mx-auto px-6 text-center max-w-5xl relative z-10">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Tại sao chúng tôi xây dựng nền tảng này?
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6 rounded-full"></div>

          <p className="text-lg text-gray-700 mb-14">
            Trong kỷ nguyên số, doanh nghiệp nhỏ và vừa thường gặp khó khăn
            trong việc duy trì sự hiện diện trực tuyến, tối ưu hóa nội dung và
            tiếp cận khách hàng tiềm năng.
            <span className="text-blue-600 font-semibold"> AutoMarketing </span>
            được tạo ra để giúp bạn tự động hóa mọi khâu tiếp thị – từ lên kế
            hoạch, tạo nội dung đến phân tích hiệu suất – một cách đơn giản và
            hiệu quả.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
            {[
              {
                title: "Tiết kiệm thời gian",
                desc: "Tự động hoá việc đăng nội dung và chăm sóc khách hàng, giúp bạn tập trung vào chiến lược tăng trưởng.",
                icon: "⏱️",
              },
              {
                title: "Ra quyết định thông minh",
                desc: "Phân tích dữ liệu theo thời gian thực để tối ưu hóa chiến dịch và chi phí tiếp thị.",
                icon: "📊",
              },
              {
                title: "Triển khai dễ dàng",
                desc: "Giao diện đơn giản, dễ học, dễ tích hợp vào quy trình làm việc hiện tại.",
                icon: "🧩",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl border border-blue-100 shadow-md hover:shadow-xl transition relative"
              >
                <div className="absolute -top-6 left-6 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl shadow-md">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mt-6 mb-3 text-blue-700">
                  {item.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-24" id="features" data-aos="fade-up">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-14 text-gray-900">
            Những tính năng nổi bật
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Chiến dịch tự động",
                desc: "Tạo, quản lý và tự động hóa toàn bộ chiến dịch tiếp thị từ một nơi duy nhất.",
              },
              {
                title: "Email cá nhân hóa",
                desc: "Gửi đúng nội dung, đến đúng người, vào đúng thời điểm với hiệu quả tối ưu.",
              },
              {
                title: "Báo cáo & phân tích",
                desc: "Theo dõi hiệu suất theo thời gian thực để cải thiện kết quả liên tục.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition text-left"
              >
                <CheckCircleIcon className="w-10 h-10 text-blue-600 mb-5" />
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Pricing Section */}
      <section className="bg-[#f7faff] py-24" id="pricing" data-aos="fade-up">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-14 text-gray-900">
            Gói dịch vụ phù hợp với bạn
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Cơ bản",
                price: "Miễn phí",
                features: [
                  "Tối đa 1 chiến dịch/tháng",
                  "Email tự động cơ bản",
                  "Hỗ trợ qua email",
                ],
              },
              {
                title: "Chuyên nghiệp",
                price: "499.000đ/tháng",
                features: [
                  "Không giới hạn chiến dịch",
                  "Email & chatbot nâng cao",
                  "Phân tích chuyên sâu",
                  "Hỗ trợ ưu tiên",
                ],
              },
              {
                title: "Doanh nghiệp",
                price: "Tùy chỉnh",
                features: [
                  "Tích hợp CRM",
                  "Báo cáo tùy chỉnh",
                  "Hỗ trợ chuyên biệt",
                  "Gói linh hoạt theo nhu cầu",
                ],
              },
            ].map((plan, index) => {
              const isSelected = selectedPlan === index;
              return (
                <div
                  key={index}
                  onClick={() => setSelectedPlan(index)}
                  className={`cursor-pointer p-8 rounded-3xl border transition duration-300 shadow-md ${
                    isSelected
                      ? "bg-blue-100 border-blue-600 shadow-lg scale-105"
                      : "bg-white border-gray-200 hover:border-blue-300 hover:shadow"
                  }`}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {plan.title}
                  </h3>
                  <p className="text-3xl font-extrabold text-blue-600 mb-6">
                    {plan.price}
                  </p>
                  <ul className="text-gray-700 mb-6 space-y-3 text-left">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {isSelected && (
                    <div className="text-sm font-medium text-blue-700 mt-2">
                      ✅ Gói đã chọn
                    </div>
                  )}
                  <a
                    href="/contact"
                    className={`mt-4 inline-block px-6 py-3 rounded-lg font-semibold transition ${
                      isSelected
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-white border border-blue-600 text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    {isSelected ? "Tiếp tục với gói này" : "Chọn gói"}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative overflow-hidden py-28 text-black text-center"
        data-aos="zoom-in"
      >
        {/* Animated background pattern layer */}
        <div
          style={{ backgroundImage: `url(${bgPattern})` }}
          className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none animate-pulse"
          aria-hidden="true"
        ></div>

        {/* Content layer */}
        <div className="relative z-10 container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            Sẵn sàng để <span className="text-yellow-300">tăng trưởng</span>?
          </h2>
          <p className="text-lg md:text-xl mb-10 opacity-90">
            Dùng thử miễn phí ngay hôm nay – không cần thẻ tín dụng.
          </p>
          <a
            href="/contact"
            className="inline-block px-10 py-3 bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-black font-semibold rounded-full shadow-xl hover:brightness-110 transition-all duration-300 transform hover:scale-105"
          >
            🚀 Bắt đầu miễn phí
          </a>
        </div>
      </section>
    </>
  );
}

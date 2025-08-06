import "./Policy.scss";
import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";

const TermsOfServiceRu = () => (
  <>
    <div className="policyWrapper">
      <div className="container">
        <h1 className="policyH1 h1">
          Договор публичной оферты об онлайн продаже товаров
        </h1>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>1.</span>Общие положения
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>1.1.</span> Настоящий документ является публичным
              предложением (офертой) ООО «Голден Трейл» (ИНН 1308261351)
              (далее — «Продавец») и содержит все существенные условия продажи
              одноразовой продукции для салонов красоты, клиник и
              косметологических кабинетов (перчатки, маски, простыни, шапочки,
              и пр.) (далее — «Товар») дистанционным способом.
            </li>
            <li className="policyInnerItem">
              <span>1.2.</span> Совершение Покупателем действий по оформлению
              заказа на сайте <a href="https://goldentrail.az/">www.goldentrail.az</a>
              («Сайт») означает полное и безоговорочное принятие условий
              настоящей Оферты.
            </li>
            <li className="policyInnerItem">
              <span>1.3.</span> Настоящая Оферта считается заключенной с
              момента подтверждения заказа Покупателем и действует в
              соответствии с Гражданским кодексом Азербайджанской Республики.
            </li>
          </ul>
        </div>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>2.</span>Предмет договора
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>2.1.</span> Продавец обязуется передать, а Покупатель —
              принять и оплатить Товар, заказанный на сайте.
            </li>
            <li className="policyInnerItem">
              <span>2.2.</span> Количество, стоимость и характеристики Товаров
              определяются на момент оформления заказа.
            </li>
          </ul>
        </div>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>3.</span>Порядок оформления заказа и оплаты
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>3.1.</span> Заказ осуществляется путем выбора позиций на
              Сайте и подтверждения заказа через электронную форму.
            </li>
            <li className="policyInnerItem">
              <span>3.2.</span> Оплата производится онлайн или при получении
              (если такая возможность предусмотрена).
            </li>
            <li className="policyInnerItem">
              <span>3.3.</span> Все цены указаны в Азербайджанских манатах с
              учетом НДС и не включают стоимость доставки, если не указано
              иное.
            </li>
          </ul>
        </div>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>4.</span> Доставка и передача товара
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>4.1.</span> Доставка осуществляется курьером, почтовыми или
              транспортными компаниями. Сроки и стоимость доставки указываются
              при оформлении заказа.
            </li>
            <li className="policyInnerItem">
              <span>4.2.</span> Риск случайной утраты переходит к Покупателю с
              момента передачи товара курьеру/транспортной компании.
            </li>
          </ul>
        </div>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>5.</span>Возврат и обмен
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>5.1.</span> В соответствии с законодательством, ошибочно
              отправленный или дефектный Товар может быть возвращен или обменен
              на надлежащий.
            </li>
            <li className="policyInnerItem">
              <span>5.2.</span> В соответствии с Законом Азербайджанской
              Республики «О защите прав потребителей» гигиенические изделия с
              признаками использования обмену не подлежат.
            </li>
          </ul>
        </div>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>6.</span>Ответственность
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>6.1.</span>Продавец не несет ответственности за
              невозможность использования Товара по индивидуальным причинам
              Покупателя.
            </li>
            <li className="policyInnerItem">
              <span>6.2.</span>Продавец не несет ответственности за задержки в
              доставке по вине третьих лиц.
            </li>
          </ul>
        </div>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>7.</span>Персональные данные
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>7.1.</span> Оформляя заказ, Покупатель дает согласие на
              обработку своих персональных данных в соответствии с Законом
              Азербайджанской Республики «О персональных данных».
            </li>
          </ul>
        </div>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>8.</span>Заключительные положения
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>8.1.</span> Настоящая Оферта действует бессрочно до
              момента ее отзыва Продавцом.
            </li>
            <li className="policyInnerItem">
              <span>8.2.</span> Споры между сторонами разрешаются путем
              переговоров, а в случае недостижения соглашения споры —
              соответствующим судом, расположенным в городе Баку.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

const TermsOfServiceAz = () => (
  <>
    <div className="policyWrapper">
      <div className="container">
        <h1 className="policyH1 h1">
          Məhsulların onlayn satışı üzrə ictimai təklif müqaviləsi
        </h1>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>1.</span>Ümumi müddəalar
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>1.1.</span> Bu sənəd "Golden Trail" MMC-nin (VÖEN 1308261351)
              (bundan sonra — «Satıcı») ictimai təklifi olub, gözəllik
              salonları, klinikalar və kosmetoloji kabinetlər üçün birdəfəlik
              məhsulların (əlcəklər, maskalar, çarpayı örtükləri, papaqlar və
              s.) (bundan sonra — «Məhsul») məsafədən satışı üçün bütün əsas
              şərtləri ehtiva edir.
            </li>
            <li className="policyInnerItem">
              <span>1.2.</span> <a href="https://goldentrail.az/">www.goldentrail.az</a>
              ("Sayt") saytında sifariş verən Alıcı bu Təklifin şərtlərini tam
              və qeyd-şərtsiz qəbul etmiş sayılır.
            </li>
            <li className="policyInnerItem">
              <span>1.3.</span> Bu Təklif Alıcı tərəfindən sifariş
              təsdiqləndiyi andan etibarən bağlanmış hesab olunur və Azərbaycan
              Respublikası Mülki Məcəlləsinə uyğun olaraq həyata keçirilir.
            </li>
          </ul>
        </div>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>2.</span>Müqavilənin predmeti
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>2.1.</span> Satıcı Saytda sifariş edilmiş Məhsulu Alıcıya
              təhvil verməyi, Alıcı isə onu qəbul edib ödəniş etməyi öhdəsinə
              götürür.
            </li>
            <li className="policyInnerItem">
              <span>2.2.</span> Məhsulun miqdarı, qiyməti və xüsusiyyətləri
              sifarişin rəsmiləşdirilməsi zamanı müəyyən edilir.
            </li>
          </ul>
        </div>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>3.</span>Sifarişin rəsmiləşdirilməsi və ödəniş
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>3.1.</span> Sifariş Saytda məhsulların seçilməsi və
              elektron forma vasitəsilə təsdiqlənməsi ilə həyata keçirilir.
            </li>
            <li className="policyInnerItem">
              <span>3.2.</span> Ödəniş onlayn və ya (imkan olduqda) çatdırılma
              zamanı həyata keçirilir.
            </li>
            <li className="policyInnerItem">
              <span>3.3.</span> Bütün qiymətlər ƏDV daxil olmaqla Azərbaycan
              manatı ilə göstərilir və çatdırılma dəyərini əhatə etmir (əlavə
              qeyd olunmadığı halda).
            </li>
          </ul>
        </div>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>4.</span>Çatdırılma və malın təhvili
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>4.1.</span> Çatdırılma kuryer, poçt və ya nəqliyyat
              şirkətləri tərəfindən həyata keçirilir. Çatdırılma müddəti və
              dəyəri sifariş zamanı göstərilir.
            </li>
            <li className="policyInnerItem">
              <span>4.2.</span> Malla bağlı təsadüfi itki riski mal
              kuryerə/nəqliyyat şirkətinə verildiyi andan Alıcıya keçir.
            </li>
          </ul>
        </div>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>5.</span>Qaytarma və dəyişdirmə
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>5.1.</span> Qanunvericiliyə əsasən, səhv göndərilmiş və ya
              qüsurlu Məhsul geri qaytarıla və ya uyğun olanı ilə dəyişdirilə
              bilər.
            </li>
            <li className="policyInnerItem">
              <span>5.2.</span> Azərbaycan Respublikası "İstehlakçıların
              hüquqlarının müdafiəsi haqqında" Qanuna əsasən, istifadə
              əlamətləri olan gigiyenik məhsullar dəyişdirilmir.
            </li>
          </ul>
        </div>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>6.</span>Məsuliyyət
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>6.1.</span> Satıcı, Məhsulun Alıcının fərdi səbəblərinə
              görə istifadə olunmaması üçün məsuliyyət daşımır.
            </li>
            <li className="policyInnerItem">
              <span>6.2.</span> Satıcı üçüncü şəxslərin günahı ucbatından baş
              verən çatdırılma gecikmələrinə görə məsuliyyət daşımır.
            </li>
          </ul>
        </div>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>7.</span>Şəxsi məlumatlar
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>7.1.</span> Sifarişi rəsmiləşdirən Alıcı Azərbaycan
              Respublikasının "Şəxsi məlumatlar haqqında" Qanununa uyğun olaraq
              şəxsi məlumatlarının emalına razılıq verir.
            </li>
          </ul>
        </div>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>8.</span>Yekun müddəalar
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>8.1.</span> Bu Təklif Satıcı tərəfindən ləğv edilənədək
              müddətsiz qüvvədədir.
            </li>
            <li className="policyInnerItem">
              <span>8.2.</span> Mübahisələr danışıqlar yolu ilə həll edilir,
              razılıq əldə edilmədikdə — Bakı şəhərində yerləşən müvafiq
              məhkəmədə baxılır.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

const TermsOfServiceEn = () => (
  <>
    <div className="policyWrapper">
      <div className="container">
        <h1 className="policyH1 h1">
          Public offer agreement for online sale of goods
        </h1>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>1.</span>General provisions
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>1.1.</span> This document is a public offer of Golden Trail
              LLC (TIN 1308261351) (hereinafter — "Seller") and contains all
              essential terms of sale of disposable products for beauty salons,
              clinics and cosmetology rooms (gloves, masks, sheets, caps, etc.)
              (hereinafter — "Goods") remotely.
            </li>
            <li className="policyInnerItem">
              <span>1.2.</span> By placing an order on the website
              <a href="https://goldentrail.az/">www.goldentrail.az</a>
              ("Website"), the Buyer fully and unconditionally accepts the
              terms of this Offer.
            </li>
            <li className="policyInnerItem">
              <span>1.3.</span> This Offer is considered concluded from the
              moment the order is confirmed by the Buyer and is governed by the
              Civil Code of the Republic of Azerbaijan.
            </li>
          </ul>
        </div>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>2.</span>Subject of the agreement
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>2.1.</span> The Seller undertakes to transfer, and the Buyer
              to accept and pay for the Goods ordered on the Website.
            </li>
            <li className="policyInnerItem">
              <span>2.2.</span> The quantity, cost and characteristics of the
              Goods are determined at the moment of placing the order.
            </li>
          </ul>
        </div>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>3.</span>Order placement and payment procedure
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>3.1.</span> The order is placed by selecting items on the
              Website and confirming the order through the electronic form.
            </li>
            <li className="policyInnerItem">
              <span>3.2.</span> Payment is made online or upon receipt (if
              available).
            </li>
            <li className="policyInnerItem">
              <span>3.3.</span> All prices are indicated in Azerbaijani manats
              including VAT and do not include delivery cost unless otherwise
              stated.
            </li>
          </ul>
        </div>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>4.</span>Delivery and transfer of goods
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>4.1.</span> Delivery is carried out by courier, postal or
              transport companies. Delivery terms and cost are indicated when
              placing the order.
            </li>
            <li className="policyInnerItem">
              <span>4.2.</span> The risk of accidental loss passes to the Buyer
              at the moment the goods are handed over to the courier/transport
              company.
            </li>
          </ul>
        </div>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>5.</span>Returns and exchange
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>5.1.</span> According to the law, mistakenly shipped or
              defective Goods may be returned or exchanged.
            </li>
            <li className="policyInnerItem">
              <span>5.2.</span> According to the Law of the Republic of
              Azerbaijan "On protection of consumer rights", hygienic products
              with signs of use are not subject to exchange.
            </li>
          </ul>
        </div>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>6.</span>Liability
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>6.1.</span>The Seller is not responsible for the
              impossibility of using the Goods for personal reasons of the
              Buyer.
            </li>
            <li className="policyInnerItem">
              <span>6.2.</span>The Seller is not responsible for delivery
              delays caused by third parties.
            </li>
          </ul>
        </div>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>7.</span>Personal data
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>7.1.</span> By placing an order, the Buyer agrees to the
              processing of his personal data in accordance with the Law of the
              Republic of Azerbaijan "On personal data".
            </li>
          </ul>
        </div>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>8.</span>Final provisions
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>8.1.</span> This Offer is valid indefinitely until revoked
              by the Seller.
            </li>
            <li className="policyInnerItem">
              <span>8.2.</span> Disputes are resolved through negotiations, and
              if no agreement is reached—by the competent court located in
              Baku.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

const TermsOfService = () => {
  const { language } = useContext(LanguageContext);
  if (language === "az") return <TermsOfServiceAz />;
  if (language === "en") return <TermsOfServiceEn />;
  return <TermsOfServiceRu />;
};

export default TermsOfService;


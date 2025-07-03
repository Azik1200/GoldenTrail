import "./Policy.scss";
import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";

const PrivacyPolicyRu = () => (
  <>
    <div className="policyWrapper">
      <div className="container">
        <h1 className="policyH1 h1">
          Пользовательское соглашение Сайта{" "}
          <a href="https://goldentrail.az/">www.goldentrail.az</a>
        </h1>
        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>1.</span>Общие положения
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>1.1.</span> Настоящее Пользовательское соглашение (далее —
              «Соглашение») регулирует отношения между администрацией сайта{" "}
              <a href="https://goldentrail.az/"> www.goldentrail.az</a> и любым
              пользователем (далее — «Пользователь»).
            </li>
            <li className="policyInnerItem">
              <span>1.2.</span> Использование Сайта означает полное согласие
              Пользователя с условиями Соглашения.
            </li>
          </ul>
        </div>

          <div className="policyInner">
            <h2 className="policyInnerHeader">
              <span>2.</span>Регистрация и учетная запись
            </h2>
            <ul className="policyInnerList">
              <li className="policyInnerItem">
                <span>2.1.</span> Для оформления заказа Пользователь должен
                пройти регистрацию, указав достоверные персональные данные.
              </li>
              <li className="policyInnerItem">
                <span>2.2.</span> Пользователь несет ответственность за
                безопасность своих учетных данных.
              </li>
            </ul>
          </div>

          <div className="policyInner">
            <h2 className="policyInnerHeader">
              <span>3.</span> Права и обязанности сторон
            </h2>
            <ul className="policyInnerList">
              <li className="policyInnerItem">
                <span>3.1.</span> Администрация вправе: • изменять содержание
                Сайта; • приостанавливать доступ к Сайту при необходимости
                технических работ.
              </li>
              <li className="policyInnerItem">
                <span>3.2.</span> Пользователь обязуется: • не использовать Сайт
                для противоправной деятельности; • предоставлять достоверную
                информацию при заказе.
              </li>
            </ul>
          </div>

          <div className="policyInner">
            <h2 className="policyInnerHeader">
              <span>4.</span> Интеллектуальная собственность
            </h2>
            <ul className="policyInnerList">
              <li className="policyInnerItem">
                <span>4.1.</span>Все материалы Сайта (тексты, изображения,
                логотипы) являются объектами авторских прав. Их использование
                возможно только с письменного согласия администрации.
              </li>
            </ul>
          </div>

          <div className="policyInner">
            <h2 className="policyInnerHeader">
              <span>5.</span>Ограничение ответственности
            </h2>
            <ul className="policyInnerList">
              <li className="policyInnerItem">
                <span>5.1.</span> Администрация не несет ответственности за: •
                временную недоступность Сайта; • действия третьих лиц, повлекшие
                за собой сбои или утечку информации.
              </li>
            </ul>
          </div>

          <div className="policyInner">
            <h2 className="policyInnerHeader">
              <span>6.</span>Персональные данные
            </h2>
            <ul className="policyInnerList">
              <li className="policyInnerItem">
                <span>6.1.</span>Использование Сайта предполагает согласие на
                обработку персональных данных в соответствии с законодательством
                и Законом Азербайджанской Республики «О персональных данных».
              </li>
            </ul>
          </div>

          <div className="policyInner">
            <h2 className="policyInnerHeader">
              <span>7.</span>Заключительные положения
            </h2>
            <ul className="policyInnerList">
              <li className="policyInnerItem">
                <span>7.1.</span> Администрация Сайта вправе вносить изменения в
                Соглашение в любое время без предварительного уведомления, и
                такие изменения вступают в силу с момента их размещения на
                Сайте.
              </li>
              <li className="policyInnerItem">
                <span>7.2.</span> Продолжение использования Сайта после внесения
                изменений означает согласие Пользователя с новой редакцией.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );


const PrivacyPolicyAz = () => (
  <>
    <div className="policyWrapper">
      <div className="container">
        <h1 className="policyH1 h1">
          Saytın Istifadəçi Razılaşması{" "}
          <a href="https://goldentrail.az/">www.goldentrail.az</a>
        </h1>
        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>1.</span>Ümumi müddəalar
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>1.1.</span> Bu İstifadəçi razılaşması (bundan sonra – «Razılaşma»)
              www.goldentrail.az saytı administrasiyası ilə hər bir istifadəçi
              («İstifadəçi») arasındakı münasibətləri tənzimləyir.
            </li>
            <li className="policyInnerItem">
              <span>1.2.</span> Saytdan istifadə Razılaşmanın şərtlərini tam qəbul
              etmək deməkdir.
            </li>
          </ul>
        </div>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>2.</span>Qeydiyyat və hesab
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>2.1.</span> Sifariş üçün istifadəçi qeydiyyatdan keçməli və
              düzgün şəxsi məlumatlarını göstərməlidir.
            </li>
            <li className="policyInnerItem">
              <span>2.2.</span> İstifadəçi hesab məlumatlarının təhlükəsizliyinə
              görə məsuliyyət daşıyır.
            </li>
          </ul>
        </div>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>3.</span>Tərəflərin hüquq və vəzifələri
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>3.1.</span> Administrasiya hüququna malikdir: • Saytın
              məzmununu dəyişməyə; • texniki işlər aparılarkən Sayta girişi
              dayandırmağa.
            </li>
            <li className="policyInnerItem">
              <span>3.2.</span> İstifadəçi öhdəlik götürür: • Saytdan qanunsuz
              fəaliyyət üçün istifadə etməməyə; • sifariş zamanı düzgün məlumat
              təqdim etməyə.
            </li>
          </ul>
        </div>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>4.</span>Əqli mülkiyyət
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>4.1.</span> Saytdakı bütün materiallar (mətnlər, şəkillər,
              loqolar) müəllif hüquqları obyektidir. Onlardan yalnız
              administrasiyanın yazılı razılığı ilə istifadə oluna bilər.
            </li>
          </ul>
        </div>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>5.</span>Məsuliyyətin məhdudlaşdırılması
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>5.1.</span> Administrasiya aşağıdakılara görə məsuliyyət
              daşımır: • Saytın müvəqqəti əlçatmaz olmasına; • üçüncü şəxslərin
              hərəkətləri nəticəsində yaranan nasazlıqlara və ya məlumat
              sızmasına.
            </li>
          </ul>
        </div>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>6.</span>Şəxsi məlumatlar
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>6.1.</span> Saytdan istifadə Azərbaycan Respublikasının
              «Şəxsi məlumatlar haqqında» Qanununa uyğun olaraq şəxsi
              məlumatların emalına razılıq verilməsi deməkdir.
            </li>
          </ul>
        </div>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>7.</span>Son müddəalar
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>7.1.</span> Sayt administrasiyası xəbərdarlıq etmədən
              Razılaşmaya dəyişikliklər edə bilər və həmin dəyişikliklər Saytda
              dərc edildiyi andan qüvvəyə minir.
            </li>
            <li className="policyInnerItem">
              <span>7.2.</span> Dəyişikliklərdən sonra Saytdan istifadəni davam
              etdirmək İstifadəçinin yeni redaksiya ilə razı olduğunu bildirir.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

const PrivacyPolicyEn = () => (
  <>
    <div className="policyWrapper">
      <div className="container">
        <h1 className="policyH1 h1">
          User Agreement of the website{" "}
          <a href="https://goldentrail.az/">www.goldentrail.az</a>
        </h1>
        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>1.</span>General provisions
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>1.1.</span> This User Agreement (the "Agreement") governs the
              relationship between the administration of the website{" "}
              <a href="https://goldentrail.az/">www.goldentrail.az</a> and any
              user (the "User").
            </li>
            <li className="policyInnerItem">
              <span>1.2.</span> Using the Site signifies the User's full
              acceptance of the Agreement.
            </li>
          </ul>
        </div>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>2.</span>Registration and account
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>2.1.</span> To place an order, the User must register and
              provide accurate personal information.
            </li>
            <li className="policyInnerItem">
              <span>2.2.</span> The User is responsible for the security of their
              account data.
            </li>
          </ul>
        </div>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>3.</span>Rights and obligations of the parties
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>3.1.</span> The Administration may modify the content of the
              Site and suspend access when technical maintenance is required.
            </li>
            <li className="policyInnerItem">
              <span>3.2.</span> The User undertakes not to use the Site for
              unlawful activities and to provide accurate information when
              ordering.
            </li>
          </ul>
        </div>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>4.</span>Intellectual property
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>4.1.</span> All materials of the Site (texts, images, logos)
              are protected by copyright. Their use is allowed only with written
              permission from the Administration.
            </li>
          </ul>
        </div>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>5.</span>Limitation of liability
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>5.1.</span> The Administration is not liable for temporary
              unavailability of the Site or for actions of third parties that
              result in failures or information leaks.
            </li>
          </ul>
        </div>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>6.</span>Personal data
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>6.1.</span> Use of the Site implies consent to the
              processing of personal data in accordance with the legislation and
              the Law of the Republic of Azerbaijan "On Personal Data".
            </li>
          </ul>
        </div>

        <div className="policyInner">
          <h2 className="policyInnerHeader">
            <span>7.</span>Final provisions
          </h2>
          <ul className="policyInnerList">
            <li className="policyInnerItem">
              <span>7.1.</span> The Administration may amend the Agreement at any
              time without prior notice. Such changes come into force once
              posted on the Site.
            </li>
            <li className="policyInnerItem">
              <span>7.2.</span> Continued use of the Site after changes means the
              User accepts the new version.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

const PrivacyPolicy = () => {
  const { language } = useContext(LanguageContext);
  if (language === "az") return <PrivacyPolicyAz />;
  if (language === "en") return <PrivacyPolicyEn />;
  return <PrivacyPolicyRu />;
};

export default PrivacyPolicy;

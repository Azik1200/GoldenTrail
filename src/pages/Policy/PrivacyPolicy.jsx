import "./Policy.scss";

const PrivacyPolicy = () => {
  return (
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
                <a href="https://goldentrail.az/"> www.goldentrail.az</a> и
                любым пользователем (далее — «Пользователь»).
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
};

export default PrivacyPolicy;

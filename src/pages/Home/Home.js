import "./home.scss";

const Home = () => {
  return (
    <main className="home">
      <section className="main-box">
        <article className="main-left">
          <img
            className="main-left-image"
            src="./assets/no1_image.jpeg"
            alt="no1 image load 실패"
          />
          <div className="title-box">
            <p className="numbering-title">No.1</p>
            <p className="social-title">0112mm_min</p>
          </div>
        </article>
        <article className="main-right">
          <div className="images-top">
            <div className="image-top-box-left">
              <img
                className="image-top-left"
                src="./assets/no2_image.jpg"
                alt="no2 image load 실패"
              />
              <div className="title-box">
                <p className="top-left-numbering-title">No.2</p>
                <p className="top-left-social-title">jihoon308</p>
              </div>
            </div>
            <div className="image-top-box-right">
              <img
                className="image-top-right"
                src="./assets/no3_image.jpg"
                alt="no3 image load 실패"
              />
              <div className="title-box">
                <p className="top-right-numbering-title">No.3</p>
                <p className="top-right-social-title">8730_king</p>
              </div>
            </div>
          </div>
          <div className="images-bottom">
            <div className="image-bottom-box">
              <img
                className="image-bottom-left"
                src="./assets/no4_image.jpg"
                alt="no4 image load 실패"
              />
              <div className="title-box">
                <p className="bottom-numbering-title">No.4</p>
                <p className="bottom-social-title">rec8730</p>
              </div>
            </div>
            <div className="title-bottom-right">
              <p>너의</p>
              <p>트렌드</p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};

export default Home;

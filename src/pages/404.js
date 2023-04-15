import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NotFound() {
    return (
      <div className='not-found-page'>
        <Head>
          <title>carpe diem - 404!</title>
          <meta name="description" content="carpe diem. to-do" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/carpe-diem-logo.png" />
        </Head>
        <div className="container container-404">
          <div className="row">
            <div className="col-12 d-flex flex-column align-items-center justify-content-center mid-center">
              <p>404</p>
              <img src="/404image.png" alt="404" />
              <p>Page not found!</p>
            </div>
          </div>
        </div>
      </div>
      )

}

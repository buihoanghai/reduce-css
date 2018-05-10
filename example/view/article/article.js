import React, { Component } from 'react'
import stylesheet from './article.scss'
import Head from 'next/head'
import CONTENT from './partials/content'
import PopularArticle from './partials/popular-article'
import GoogleAds from './partials/google-ads'
import RelatedProducts from './partials/related-products'
import News from './partials/news'
export default class extends Component {

  static async getInitialProps ({ req, query }) {
    const isServer = !!req;

    if (isServer) {
      // When being rendered server-side, we have access to our data in query that we put there in routes/item.js,
      // saving us an http call. Note that if we were to try to require('../operations/get-item') here,
      // it would result in a webpack error.
      return { itemData: query.itemData }
    }
  }
  render () {
    return <div>
      <Head>
        <title>{this.props.itemData.title}</title>
        <style amp-custom=""  dangerouslySetInnerHTML={{ __html: stylesheet }}  />
        <link rel="canonical" href={"/bai-viet/" + this.props.itemData.key}/>

        <script type="application/ld+json" dangerouslySetInnerHTML={ { __html:  JSON.stringify(
            {
              "@context": "http://schema.org",
              "@type": "NewsArticle",
              "mainEntityOfPage": "/bai-viet/" + this.props.itemData.key,
              "headline": "Lorem Ipsum",
              "datePublished": "1907-05-05T12:02:41Z",
              "dateModified": "1907-05-05T12:02:41Z",
              "description": "The Catiline Orations continue to begule engineers and designers alike -- but can it stand the test of time?",
              "author": {
                "@type": "Person",
                "name": "Jordan M Adler"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Google",
                "logo": {
                  "@type": "ImageObject",
                  "url": "http://cdn.ampproject.org/logo.jpg",
                  "width": 600,
                  "height": 60
                }
              },
              "image": {
                "@type": "ImageObject",
                "url": "http://ifarmer.vn/assets/img/article/article1.jpg",
                "height": 2000,
                "width": 800
              }
            }
          )}}>

        </script>
      </Head>

      <main className="mw9 center pa2 pa3-l gray">
        <h1 className="f3 mv1">{this.props.itemData.title}</h1>
        <span className="f6">{this.props.itemData.created} Bởi {this.props.itemData.author}</span>
        <div className="relative">
          <div className="pr24r-l">
              <CONTENT itemData={this.props.itemData} />
          </div>
          <div className="top-0 right-0 absolute-l w24r-l pl3-l mt3 mt0-l">
              <PopularArticle itemData={this.props.itemData}/>
              <GoogleAds itemData={this.props.itemData}/>
              <RelatedProducts itemData={this.props.itemData}/>
          </div>
          <div className="mt3">
            <News itemData={this.props.itemData}/>
          </div>
        </div>
      </main>
    </div>
  }
}

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(url, language) {
    const baseUrl = this.props.config.baseUrl;
    return url.indexOf('https') < 0 
      ? baseUrl + 'docs/' + (language ? language + '/' : '') + url
      : url;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? language + '/' : '') + doc;
  }

  render() {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>Vendors</h5>
            <a href="https://app.lushplans.com/"
              target="_blank"
              rel="noreferrer noopener">
              Top Vendors
            </a>
            <a  href="https://app.lushplans.com"
              target="_blank"
              rel="noreferrer noopener">
              Vendor Profile
            </a>
            <a href="https://lushplans.com/faq"
              target="_blank"
              rel="noreferrer noopener">
              Vendor FAQ
            </a>
          </div>
          <div>
            <h5>Couples</h5>
            <a href="https://mywedding.lushplans.com/guests"
              target="_blank"
              rel="noreferrer noopener">
              Manage guests
            </a>
            <a  href="https://mywedding.lushplans.com/"
              target="_blank"
              rel="noreferrer noopener">
              Design Invitation
            </a>
            <a href="https://lushplans.com/faq"
              target="_blank"
              rel="noreferrer noopener">
              Couple FAQ
            </a>
          </div>
          <div>
            <h5>Social Media</h5>
            <a href="https://instagram.com/lushplans/"
              target="_blank"
              rel="noreferrer noopener">
              Instagram
            </a>
            <a href="https://twitter.com/lushplans/"
              target="_blank"
              rel="noreferrer noopener">
              Twitter
            </a>
            <a href="https://facebook.com/lushplans/"
              target="_blank"
              rel="noreferrer noopener">
              Facebook
            </a>
          </div>
        </section>
        
        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;

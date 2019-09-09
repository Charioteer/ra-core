var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { Children, Component } from 'react';
import Polyglot from 'node-polyglot';
import { connect } from 'react-redux';
import defaultMessages from 'ra-language-english';
import defaultsDeep from 'lodash/defaultsDeep';
import { TranslationContext, } from './TranslationContext';
/**
 * Creates a translation context, available to its children
 *
 * Must be called within a Redux app.
 *
 * @example
 *     const MyApp = () => (
 *         <Provider store={store}>
 *             <TranslationProvider locale="fr" messages={messages}>
 *                 <!-- Child components go here -->
 *             </TranslationProvider>
 *         </Provider>
 *     );
 */
var TranslationProviderView = /** @class */ (function (_super) {
    __extends(TranslationProviderView, _super);
    function TranslationProviderView(props) {
        var _this = _super.call(this, props) || this;
        var locale = props.locale, messages = props.messages, options = props.options;
        var polyglot = new Polyglot(__assign({ locale: locale, phrases: defaultsDeep({ '': '' }, messages, defaultMessages) }, options));
        _this.state = {
            contextValues: {
                locale: locale,
                translate: polyglot.t.bind(polyglot),
            },
        };
        return _this;
    }
    TranslationProviderView.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.locale !== this.props.locale ||
            prevProps.messages !== this.props.messages) {
            var _a = this.props, locale = _a.locale, messages = _a.messages, options = _a.options;
            var polyglot = new Polyglot(__assign({ locale: locale, phrases: defaultsDeep({ '': '' }, messages, defaultMessages) }, options));
            this.setState({
                contextValues: {
                    locale: locale,
                    translate: polyglot.t.bind(polyglot),
                },
            });
        }
    };
    TranslationProviderView.prototype.render = function () {
        var children = this.props.children;
        var contextValues = this.state.contextValues;
        return (React.createElement(TranslationContext.Provider, { value: contextValues }, Children.only(children)));
    };
    return TranslationProviderView;
}(Component));
var mapStateToProps = function (state) { return ({
    locale: state.i18n.locale,
    messages: state.i18n.messages,
}); };
var TranslationProvider = connect(mapStateToProps)(TranslationProviderView);
export default TranslationProvider;

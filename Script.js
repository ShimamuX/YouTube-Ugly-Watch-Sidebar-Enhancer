// ==UserScript==
// @name         YouTube - Force Watch Sidebar Width to 500px
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Forces --ytd-watch-flexy-sidebar-width to 500px on watch pages (overrides auto-expand on scroll etc.)
// @author       Shirorin/ShimamuX
// @match        https://www.youtube.com/watch*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const desiredWidth = '450px';

    const style = document.createElement('style');
    style.id = 'force-youtube-sidebar-500px';
    style.textContent = `
        ytd-watch-flexy {
            --ytd-watch-flexy-sidebar-width: ${desiredWidth} !important;
        }

        /* Cover media queries & dynamic changes */
        @media (min-width: 1000px) {
            ytd-watch-flexy {
                --ytd-watch-flexy-sidebar-width: ${desiredWidth} !important;
            }
        }

        /* Force secondary column elements to respect the new width */
        #secondary.ytd-watch-flexy,
        #secondary-inner.ytd-watch-flexy {
            width: ${desiredWidth} !important;
            max-width: ${desiredWidth} !important;
            min-width: 0 !important;
            flex: 0 0 ${desiredWidth} !important;
        }

        /* Optional: prevent overflow if thumbnails try to stretch */
        #items.ytd-watch-next-secondary-results-renderer {
            max-width: ${desiredWidth} !important;
        }
    `;

    if (document.head) {
        document.head.appendChild(style);
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            document.head.appendChild(style);
        });
    }

    const observer = new MutationObserver(() => {
        document.querySelectorAll('ytd-watch-flexy').forEach(el => {
            el.style.setProperty('--ytd-watch-flexy-sidebar-width', desiredWidth, 'important');
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['style'],
        subtree: true
    });

    setTimeout(() => {
        document.querySelectorAll('ytd-watch-flexy').forEach(el => {
            el.style.setProperty('--ytd-watch-flexy-sidebar-width', desiredWidth, 'important');
        });
    }, 50);

    setInterval(() => {
        document.querySelectorAll('ytd-watch-flexy').forEach(el => {
            if (el.style.getPropertyValue('--ytd-watch-flexy-sidebar-width') !== desiredWidth) {
                el.style.setProperty('--ytd-watch-flexy-sidebar-width', desiredWidth, 'important');
            }
        });
    }, 2000);

})();

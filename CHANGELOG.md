#### 2.1.6 (2017-12-12)

##### Chores

* **package:**
  * update coveralls to version 3.0.0 ([#23](https://github.com/fvdm/nodejs-bitminter/pull/23)) ([3f70d9aa](https://github.com/fvdm/nodejs-bitminter/commit/3f70d9aaf5c622d5b3e79cc9fd3dec91f71e5487))
  * update eslint to version 4.2.0 ([828f1f9b](https://github.com/fvdm/nodejs-bitminter/commit/828f1f9b5f54fa5e06933860ff886d6bbffa1a56))
  * Update dotest dev dep ([060ba207](https://github.com/fvdm/nodejs-bitminter/commit/060ba2077e21b09b8e464638383192fdf790e669))
  * Update dev deps ([f701a7f2](https://github.com/fvdm/nodejs-bitminter/commit/f701a7f2426a6e8862e0c067e92a792eaadaece8))
  * Replaced test runner and dev deps by dotest ([a78e9db3](https://github.com/fvdm/nodejs-bitminter/commit/a78e9db3fe87f99a16977474a830911792907022))
* **develop:** Added bitHound config ([0a3ccdc4](https://github.com/fvdm/nodejs-bitminter/commit/0a3ccdc405632b0b085d30597d95db2accb4036a))

##### Other Changes

* **chore:** Reduces dev deps to dotest ([7a47e54f](https://github.com/fvdm/nodejs-bitminter/commit/7a47e54fede4c145b9b78379eb627ccd3b887ab6))

##### Refactors

* **readme:** Add coffee link to Author ([da8e8fa5](https://github.com/fvdm/nodejs-bitminter/commit/da8e8fa54d00c2de669d7c40f2663258e75281bb))

##### Tests

* **config:**
  * Update Travis CI node versions ([968f634c](https://github.com/fvdm/nodejs-bitminter/commit/968f634c20afc9f4731e2f5998e8f6a6612ce5d8))
  * Use dynamic node versions on Travis CI ([16eae254](https://github.com/fvdm/nodejs-bitminter/commit/16eae254b5c51678b62676f9ee7be335351a93f4))
* **runner:** Cleaner output with more whitespace ([bee1727f](https://github.com/fvdm/nodejs-bitminter/commit/bee1727fcdaed590edb03c9531dfc63af236a10c))

#### 2.1.5 (2016-8-22)

##### Tests

* **runner:** Removed graph from commits log ([66b779bb](https://github.com/fvdm/nodejs-bitminter/commit/66b779bb070033ffe089eaf30390ea2850d0f83e))

#### 2.1.4 (2016-8-22)

##### Chores

* **develop:** Added gitignore config ([367b2ed2](https://github.com/fvdm/nodejs-bitminter/commit/367b2ed22982514e6a8a7f20341438f94bbfddb9))
* **package:**
  * update istanbul to version 0.4.5 ([95f1b80e](https://github.com/fvdm/nodejs-bitminter/commit/95f1b80e66f0a57c2ebf442287d607cb294a7fa4))
  * update eslint to version 3.0.0 ([58094b87](https://github.com/fvdm/nodejs-bitminter/commit/58094b879668c4b4450e6bd776c104ea6a0614c3))

##### Bug Fixes

* **error:** Fixed processError() msg reference ([5ab1fa58](https://github.com/fvdm/nodejs-bitminter/commit/5ab1fa5845a28c859fd767dab992226a6a78a314))

##### Refactors

* **error:** Reordered processError args ([3d2ef76b](https://github.com/fvdm/nodejs-bitminter/commit/3d2ef76b62d8708f8c6b7becb2da2986179cd89a))
* **package:** Minimum supported node v4.0 ([cd71c0a1](https://github.com/fvdm/nodejs-bitminter/commit/cd71c0a1c8ca02e66984eb74e515dd25cca9be6c))

##### Code Style Changes

* **eslint:** Only warn on underscore dangle ([3043effd](https://github.com/fvdm/nodejs-bitminter/commit/3043effd121be2c7cc223a1981db38e0daedbab3))

##### Tests

* **runner:**
  * Log commits since last release ([3493de5c](https://github.com/fvdm/nodejs-bitminter/commit/3493de5cb7ecd2cefcce670ff8e13c3b0624fa77))
  * More verbose test output ([a1249b0a](https://github.com/fvdm/nodejs-bitminter/commit/a1249b0a128374840b53b61e266b0a16ba6f0860))

#### 2.1.3 (2016-6-7)

##### Documentation Changes

* **badges:** Replace CodeClimate with Coveralls ([f50a8e03](https://github.com/fvdm/nodejs-bitminter/commit/f50a8e03c7713c5431a3bcb5881b0735bd4903c9))

##### Other Changes

* **setup:**
  * Move timeout instance to end of queue ([845c8148](https://github.com/fvdm/nodejs-bitminter/commit/845c814869bfe9968a848c637e83a2fed94481cc))
  * Create new instances for error tests ([0dacfc77](https://github.com/fvdm/nodejs-bitminter/commit/0dacfc77504f2766fa4c80504f8791b47546c759))
* **fix:** Fixed minor typos ([40157fa3](https://github.com/fvdm/nodejs-bitminter/commit/40157fa32299fb5980f47551097fbbb4809bc9c0))
* **tests:** Add module interface test ([45d86a12](https://github.com/fvdm/nodejs-bitminter/commit/45d86a128eb2e1bcc77b6c3f1fafe0e906f6cfdb))
* **methods:** Add timeout and API errors ([6dc4c546](https://github.com/fvdm/nodejs-bitminter/commit/6dc4c54631435a02240c42b78f4edc3a376c11e2))

##### Refactors

* **error:** Moved error handling to function ([bb9e06d1](https://github.com/fvdm/nodejs-bitminter/commit/bb9e06d1fe32a8ce752e58b00a4ce949ed8dead8))

##### Tests

* **setup:** Config default are set by the module ([f57b1530](https://github.com/fvdm/nodejs-bitminter/commit/f57b1530949d547332bc6181ee49a232b71f88fe))
* **script:** Replace CodeClimate with Coveralls ([e6026345](https://github.com/fvdm/nodejs-bitminter/commit/e60263452b04fcb2be8d41e6db93c7c1783557e2))
* **config:** Remove CodeClimate settings ([0a73b50e](https://github.com/fvdm/nodejs-bitminter/commit/0a73b50e870bfbbb31897e3df0f287278b5e62c4))
* **package:** Replace CodeClimate with Coveralls ([f9de65f5](https://github.com/fvdm/nodejs-bitminter/commit/f9de65f5db55f350c6bf240426cf66c8c73b3bf0))

#### 2.1.2 (2016-6-1)

##### Chores

* **package:**
  * CHANGELOG.md is included by default ([f32401c6](https://github.com/fvdm/nodejs-bitminter/commit/f32401c6e34defad2cafa7f242c8e99f288c1578))
  * Update dependencies versions ([f68b5f5e](https://github.com/fvdm/nodejs-bitminter/commit/f68b5f5e5dea24ff70a8a56eb320866479f81e7d))

##### Documentation Changes

* **badges:** Add CodeClimate coverage ([aa48b80e](https://github.com/fvdm/nodejs-bitminter/commit/aa48b80ef08e42adb90b39f81c225bf397cfc19e))
* **readme:** Add version badge for changelog ([9858158c](https://github.com/fvdm/nodejs-bitminter/commit/9858158c5f4f6ef0979f48949b56440eba5b03a4))

##### Tests

* **config:** Enable duplication on CodeClimate ([031125a3](https://github.com/fvdm/nodejs-bitminter/commit/031125a3b6cb4a88017d3a21d73fc581b77f9882))
* **script:** Add CodeClimate ([f468f803](https://github.com/fvdm/nodejs-bitminter/commit/f468f80315a9457a0fea9781a7631c70d023da84))

#### 2.1.1 (2016-5-25)

##### Chores

* **package:**
  * Include example.js and CHANGELOG.md in package ([f6a539bd](https://github.com/fvdm/nodejs-bitminter/commit/f6a539bd3e513a3b265cb2446f2811b3e07a21d5))
  * add more keywords ([8ed6e647](https://github.com/fvdm/nodejs-bitminter/commit/8ed6e6470cf7d3ec6ef308e7a2019612e49a3cbf))
  * update eslint to version 2.5.0 ([456fef39](https://github.com/fvdm/nodejs-bitminter/commit/456fef39df682dd2cb8b80e52d6a51e75994db35))

##### Documentation Changes

* **readme:** Mention unofficial in intro text ([6561c786](https://github.com/fvdm/nodejs-bitminter/commit/6561c786193e764506d34135d9298bb72c62bd61))

##### Other Changes

* **undefined:**
  * methods h2 headers, minor clean up ([4b7683e7](https://github.com/fvdm/nodejs-bitminter/commit/4b7683e7da45478fb2b84065b02e83f95dfd0ad2))
  * updated versions ([25272fec](https://github.com/fvdm/nodejs-bitminter/commit/25272fec7978914f4d1a4ec999ac9ef54ed1690f))
  * dependencies badge ([7d077111](https://github.com/fvdm/nodejs-bitminter/commit/7d07711153fc210690379729ae1ca32eb31f3480))
  * clean up redundant check messages ([8d427690](https://github.com/fvdm/nodejs-bitminter/commit/8d4276908a9c33934b610f7e7b6714a30f146bd9))
  * add node v6 to Travis config ([34b10039](https://github.com/fvdm/nodejs-bitminter/commit/34b100397de1b6418fc0de21567157a106810333))
  * always run both test commands ([e6a4e261](https://github.com/fvdm/nodejs-bitminter/commit/e6a4e26178ffd7535ffb43f364f80682ba0741a5))
  * dev dep eslint 2.5.0 is broken ([828e4a25](https://github.com/fvdm/nodejs-bitminter/commit/828e4a258ca7c734d7d0e7d0db97271e87444e0f))

##### Refactors

* **cleanup:** improved code readability ([2f655fab](https://github.com/fvdm/nodejs-bitminter/commit/2f655fabe16bc7dfc3e3a1e57c8fa8f4aa2bf9f5))
* **package:** more useful description ([6f794280](https://github.com/fvdm/nodejs-bitminter/commit/6f79428008f022cbe6931f8235b1b6175fc905f1))

##### Tests

* **cleanup:** Use the new test() alias ([5a762453](https://github.com/fvdm/nodejs-bitminter/commit/5a762453af842dde76ab085ad9a3a42364b1df14))


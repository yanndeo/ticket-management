'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nest-techwall documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-11d6d6b4dd07d8e0a34bf7f9152b35d0"' : 'data-target="#xs-controllers-links-module-AppModule-11d6d6b4dd07d8e0a34bf7f9152b35d0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-11d6d6b4dd07d8e0a34bf7f9152b35d0"' :
                                            'id="xs-controllers-links-module-AppModule-11d6d6b4dd07d8e0a34bf7f9152b35d0"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-11d6d6b4dd07d8e0a34bf7f9152b35d0"' : 'data-target="#xs-injectables-links-module-AppModule-11d6d6b4dd07d8e0a34bf7f9152b35d0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-11d6d6b4dd07d8e0a34bf7f9152b35d0"' :
                                        'id="xs-injectables-links-module-AppModule-11d6d6b4dd07d8e0a34bf7f9152b35d0"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-65dc27273d6679da89c6cecd4c96fea4"' : 'data-target="#xs-controllers-links-module-AuthModule-65dc27273d6679da89c6cecd4c96fea4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-65dc27273d6679da89c6cecd4c96fea4"' :
                                            'id="xs-controllers-links-module-AuthModule-65dc27273d6679da89c6cecd4c96fea4"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-65dc27273d6679da89c6cecd4c96fea4"' : 'data-target="#xs-injectables-links-module-AuthModule-65dc27273d6679da89c6cecd4c96fea4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-65dc27273d6679da89c6cecd4c96fea4"' :
                                        'id="xs-injectables-links-module-AuthModule-65dc27273d6679da89c6cecd4c96fea4"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ClientModule.html" data-type="entity-link">ClientModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ClientModule-48c8cd875a320990f0e970b90a9e67ac"' : 'data-target="#xs-controllers-links-module-ClientModule-48c8cd875a320990f0e970b90a9e67ac"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ClientModule-48c8cd875a320990f0e970b90a9e67ac"' :
                                            'id="xs-controllers-links-module-ClientModule-48c8cd875a320990f0e970b90a9e67ac"' }>
                                            <li class="link">
                                                <a href="controllers/ClientController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ClientController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/ContactController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContactController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ClientModule-48c8cd875a320990f0e970b90a9e67ac"' : 'data-target="#xs-injectables-links-module-ClientModule-48c8cd875a320990f0e970b90a9e67ac"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ClientModule-48c8cd875a320990f0e970b90a9e67ac"' :
                                        'id="xs-injectables-links-module-ClientModule-48c8cd875a320990f0e970b90a9e67ac"' }>
                                        <li class="link">
                                            <a href="injectables/ClientService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ClientService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ContactService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ContactService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CurriculumModule.html" data-type="entity-link">CurriculumModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CurriculumModule-b492cff6a0ce2c27f889370d06a039fd"' : 'data-target="#xs-controllers-links-module-CurriculumModule-b492cff6a0ce2c27f889370d06a039fd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CurriculumModule-b492cff6a0ce2c27f889370d06a039fd"' :
                                            'id="xs-controllers-links-module-CurriculumModule-b492cff6a0ce2c27f889370d06a039fd"' }>
                                            <li class="link">
                                                <a href="controllers/CurriculumController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CurriculumController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CurriculumModule-b492cff6a0ce2c27f889370d06a039fd"' : 'data-target="#xs-injectables-links-module-CurriculumModule-b492cff6a0ce2c27f889370d06a039fd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CurriculumModule-b492cff6a0ce2c27f889370d06a039fd"' :
                                        'id="xs-injectables-links-module-CurriculumModule-b492cff6a0ce2c27f889370d06a039fd"' }>
                                        <li class="link">
                                            <a href="injectables/CurriculumService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CurriculumService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HelpersModule.html" data-type="entity-link">HelpersModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-HelpersModule-430dafe70b0fcc23c0d926fe76d9feaf"' : 'data-target="#xs-injectables-links-module-HelpersModule-430dafe70b0fcc23c0d926fe76d9feaf"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HelpersModule-430dafe70b0fcc23c0d926fe76d9feaf"' :
                                        'id="xs-injectables-links-module-HelpersModule-430dafe70b0fcc23c0d926fe76d9feaf"' }>
                                        <li class="link">
                                            <a href="injectables/CinGeneratorService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CinGeneratorService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileModule.html" data-type="entity-link">ProfileModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ProfileModule-ba1d7d799158d44351c3acb6931d4002"' : 'data-target="#xs-controllers-links-module-ProfileModule-ba1d7d799158d44351c3acb6931d4002"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProfileModule-ba1d7d799158d44351c3acb6931d4002"' :
                                            'id="xs-controllers-links-module-ProfileModule-ba1d7d799158d44351c3acb6931d4002"' }>
                                            <li class="link">
                                                <a href="controllers/ProfileController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ProfileModule-ba1d7d799158d44351c3acb6931d4002"' : 'data-target="#xs-injectables-links-module-ProfileModule-ba1d7d799158d44351c3acb6931d4002"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProfileModule-ba1d7d799158d44351c3acb6931d4002"' :
                                        'id="xs-injectables-links-module-ProfileModule-ba1d7d799158d44351c3acb6931d4002"' }>
                                        <li class="link">
                                            <a href="injectables/ProfileService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ProfileService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TicketModule.html" data-type="entity-link">TicketModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-TicketModule-80f966498339fd428e30261bedb04ce0"' : 'data-target="#xs-controllers-links-module-TicketModule-80f966498339fd428e30261bedb04ce0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TicketModule-80f966498339fd428e30261bedb04ce0"' :
                                            'id="xs-controllers-links-module-TicketModule-80f966498339fd428e30261bedb04ce0"' }>
                                            <li class="link">
                                                <a href="controllers/TicketController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TicketController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TicketModule-80f966498339fd428e30261bedb04ce0"' : 'data-target="#xs-injectables-links-module-TicketModule-80f966498339fd428e30261bedb04ce0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TicketModule-80f966498339fd428e30261bedb04ce0"' :
                                        'id="xs-injectables-links-module-TicketModule-80f966498339fd428e30261bedb04ce0"' }>
                                        <li class="link">
                                            <a href="injectables/TicketService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>TicketService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link">UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-d1f937651f365efd2c6b82cb17b5d66a"' : 'data-target="#xs-controllers-links-module-UserModule-d1f937651f365efd2c6b82cb17b5d66a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-d1f937651f365efd2c6b82cb17b5d66a"' :
                                            'id="xs-controllers-links-module-UserModule-d1f937651f365efd2c6b82cb17b5d66a"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-d1f937651f365efd2c6b82cb17b5d66a"' : 'data-target="#xs-injectables-links-module-UserModule-d1f937651f365efd2c6b82cb17b5d66a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-d1f937651f365efd2c6b82cb17b5d66a"' :
                                        'id="xs-injectables-links-module-UserModule-d1f937651f365efd2c6b82cb17b5d66a"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AddCvDTO.html" data-type="entity-link">AddCvDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClientEntity.html" data-type="entity-link">ClientEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/ContactEntity.html" data-type="entity-link">ContactEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateClientDto.html" data-type="entity-link">CreateClientDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateContactDto.html" data-type="entity-link">CreateContactDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProfileDto.html" data-type="entity-link">CreateProfileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTicketDto.html" data-type="entity-link">CreateTicketDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CurriculumEntity.html" data-type="entity-link">CurriculumEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/CurriculumSubscriber.html" data-type="entity-link">CurriculumSubscriber</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginCredentialsDto.html" data-type="entity-link">LoginCredentialsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProfileEntity.html" data-type="entity-link">ProfileEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterAuthDto.html" data-type="entity-link">RegisterAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TicketEntity.html" data-type="entity-link">TicketEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/TimestampEntity.html" data-type="entity-link">TimestampEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateClientDto.html" data-type="entity-link">UpdateClientDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateContactDto.html" data-type="entity-link">UpdateContactDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCvDTO.html" data-type="entity-link">UpdateCvDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProfileDto.html" data-type="entity-link">UpdateProfileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTicketDto.html" data-type="entity-link">UpdateTicketDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserEntity.html" data-type="entity-link">UserEntity</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/FirstMiddleware.html" data-type="entity-link">FirstMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link">JwtAuthGuard</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/PayloadInterface.html" data-type="entity-link">PayloadInterface</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});
import type { Schema, Struct } from '@strapi/strapi';

export interface SectionsCards extends Struct.ComponentSchema {
  collectionName: 'components_sections_cards';
  info: {
    displayName: 'Cards';
  };
  attributes: {
    heading: Schema.Attribute.String;
    intro: Schema.Attribute.Text;
    items: Schema.Attribute.Component<'shared.card', true>;
  };
}

export interface SectionsContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_sections_contact_infos';
  info: {
    displayName: 'Contact Info';
  };
  attributes: {
    address: Schema.Attribute.Text;
    email: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    hours: Schema.Attribute.String;
    phone: Schema.Attribute.String;
  };
}

export interface SectionsCta extends Struct.ComponentSchema {
  collectionName: 'components_sections_ctas';
  info: {
    displayName: 'CTA';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    text: Schema.Attribute.Text;
  };
}

export interface SectionsDonationForm extends Struct.ComponentSchema {
  collectionName: 'components_sections_donation_forms';
  info: {
    displayName: 'Donation Form';
  };
  attributes: {
    amountLabel: Schema.Attribute.String;
    amountOptions: Schema.Attribute.String;
    cityLabel: Schema.Attribute.String;
    currency: Schema.Attribute.String;
    emailLabel: Schema.Attribute.String;
    errorText: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    helpTypeLabel: Schema.Attribute.String;
    helpTypeOptions: Schema.Attribute.String;
    intro: Schema.Attribute.Text;
    messageLabel: Schema.Attribute.String;
    nameLabel: Schema.Attribute.String;
    phoneLabel: Schema.Attribute.String;
    sendingText: Schema.Attribute.String;
    submitText: Schema.Attribute.String;
    successButtonText: Schema.Attribute.String;
    successMessage: Schema.Attribute.Text;
    successTitle: Schema.Attribute.String;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    subheading: Schema.Attribute.Text;
  };
}

export interface SectionsStats extends Struct.ComponentSchema {
  collectionName: 'components_sections_stats';
  info: {
    displayName: 'Stats';
  };
  attributes: {
    heading: Schema.Attribute.String;
    items: Schema.Attribute.Component<'shared.stat', true>;
  };
}

export interface SectionsTextBlock extends Struct.ComponentSchema {
  collectionName: 'components_sections_text_blocks';
  info: {
    displayName: 'Text Block';
  };
  attributes: {
    body: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
  };
}

export interface SharedCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_cards';
  info: {
    displayName: 'Card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedStat extends Struct.ComponentSchema {
  collectionName: 'components_shared_stats';
  info: {
    displayName: 'Stat';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'sections.cards': SectionsCards;
      'sections.contact-info': SectionsContactInfo;
      'sections.cta': SectionsCta;
      'sections.donation-form': SectionsDonationForm;
      'sections.hero': SectionsHero;
      'sections.stats': SectionsStats;
      'sections.text-block': SectionsTextBlock;
      'shared.card': SharedCard;
      'shared.stat': SharedStat;
    }
  }
}

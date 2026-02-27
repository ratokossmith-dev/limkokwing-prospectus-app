// app/data/courseMedia.ts

export const courseImages: Record<string, Record<string, any>> = {
  // ICT Faculty
  ict: {
    ict1: require("../images/ict/intro_programming.jpg"),
    ict2: require("../images/ict/data_structures.jpg"),
    ict3: require("../images/ict/database_systems.jpg"),
    ict4: require("../images/ict/networking.jpg"),
    ict5: require("../images/ict/web_development.jpg"),
  },

  // Business Faculty
  business: {
    bus1: require("../images/business/management.jpg"),
    bus2: require("../images/business/marketing.jpg"),
    bus3: require("../images/business/accounting.jpg"),
    bus4: require("../images/business/ethics.jpg"),
    bus5: require("../images/business/entrepreneurship.jpg"),
  },

  // Multimedia Faculty
  multimedia: {
    mm1: require("../images/multimedia/graphic_design.jpg"),
    mm2: require("../images/multimedia/3d_animation.jpg"),
    mm3: require("../images/multimedia/video_production.jpg"),
    mm4: require("../images/multimedia/audio_engineering.jpg"),
    mm5: require("../images/multimedia/digital_storytelling.jpg"),
  },

  // Architecture Faculty
  architecture: {
    arch1: require("../images/architecture/architectural_design.jpg"),
    arch2: require("../images/architecture/building_materials.jpg"),
    arch3: require("../images/architecture/structural_engineering.jpg"),
    arch4: require("../images/architecture/urban_planning.jpg"),
    arch5: require("../images/architecture/architectural_history.jpg"),
  },

  // Media & Communication Faculty
  media: {
    media1: require("../images/media/journalism_reporting.jpg"),
    media2: require("../images/media/public_relations.jpg"),
    media3: require("../images/media/digital_media_production.jpg"),
    media4: require("../images/media/broadcasting_presentation.jpg"),
    media5: require("../images/media/media_ethics.jpg"),
  },
};
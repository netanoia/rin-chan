const axios = require('axios');

import { Command } from "../../interfaces/Command";

import { SlashCommandBuilder } from "@discordjs/builders";
import { AutocompleteInteraction, ChatInputCommandInteraction } from "discord.js";

const currencyChoices = [
{name: "Afghan Afghani", value: "AFA"},
{name: "Albanian Lek", value: "ALL"},
{name: "Algerian Dinar", value: "DZD"},
{name: "Angolan Kwanza", value: "AOA"},
{name: "Argentine Peso", value: "ARS"},
{name: "Armenian Dram", value: "AMD"},
{name: "Aruban Florin", value: "AWG"},
{name: "Australian Dollar", value: "AUD"},
{name: "Azerbaijani Manat", value: "AZN"},
{name: "Bahamian Dollar", value: "BSD"},
{name: "Bahraini Dinar", value: "BHD"},
{name: "Bangladeshi Taka", value: "BDT"},
{name: "Barbadian Dollar", value: "BBD"},
{name: "Belarusian Ruble", value: "BYR"},
{name: "Belgian Franc", value: "BEF"},
{name: "Belize Dollar", value: "BZD"},
{name: "Bermudan Dollar", value: "BMD"},
{name: "Bhutanese Ngultrum", value: "BTN"},
{name: "Bitcoin", value: "BTC"},
{name: "Bolivian Boliviano", value: "BOB"},
{name: "Bosnia-Herzegovina Convertible Mark", value: "BAM"},
{name: "Botswanan Pula", value: "BWP"},
{name: "Brazilian Real", value: "BRL"},
{name: "British Pound Sterling", value: "GBP"},
{name: "Brunei Dollar", value: "BND"},
{name: "Bulgarian Lev", value: "BGN"},
{name: "Burundian Franc", value: "BIF"},
{name: "Cambodian Riel", value: "KHR"},
{name: "Canadian Dollar", value: "CAD"},
{name: "Cape Verdean Escudo", value: "CVE"},
{name: "Cayman Islands Dollar", value: "KYD"},
{name: "CFA Franc BCEAO", value: "XOF"},
{name: "CFA Franc BEAC", value: "XAF"},
{name: "CFP Franc", value: "XPF"},
{name: "Chilean Peso", value: "CLP"},
{name: "Chilean Unit of Account", value: "CLF"},
{name: "Chinese Yuan", value: "CNY"},
{name: "Colombian Peso", value: "COP"},
{name: "Comorian Franc", value: "KMF"},
{name: "Congolese Franc", value: "CDF"},
{name: "Costa Rican Colón", value: "CRC"},
{name: "Croatian Kuna", value: "HRK"},
{name: "Cuban Convertible Peso", value: "CUC"},
{name: "Czech Republic Koruna", value: "CZK"},
{name: "Danish Krone", value: "DKK"},
{name: "Djiboutian Franc", value: "DJF"},
{name: "Dominican Peso", value: "DOP"},
{name: "East Caribbean Dollar", value: "XCD"},
{name: "Egyptian Pound", value: "EGP"},
{name: "Eritrean Nakfa", value: "ERN"},
{name: "Estonian Kroon", value: "EEK"},
{name: "Ethiopian Birr", value: "ETB"},
{name: "Euro", value: "EUR"},
{name: "Falkland Islands Pound", value: "FKP"},
{name: "Fijian Dollar", value: "FJD"},
{name: "Gambian Dalasi", value: "GMD"},
{name: "Georgian Lari", value: "GEL"},
{name: "German Mark", value: "DEM"},
{name: "Ghanaian Cedi", value: "GHS"},
{name: "Gibraltar Pound", value: "GIP"},
{name: "Greek Drachma", value: "GRD"},
{name: "Guatemalan Quetzal", value: "GTQ"},
{name: "Guinean Franc", value: "GNF"},
{name: "Guyanaese Dollar", value: "GYD"},
{name: "Haitian Gourde", value: "HTG"},
{name: "Honduran Lempira", value: "HNL"},
{name: "Hong Kong Dollar", value: "HKD"},
{name: "Hungarian Forint", value: "HUF"},
{name: "Icelandic Króna", value: "ISK"},
{name: "Indian Rupee", value: "INR"},
{name: "Indonesian Rupiah", value: "IDR"},
{name: "Iranian Rial", value: "IRR"},
{name: "Iraqi Dinar", value: "IQD"},
{name: "Israeli New Sheqel", value: "ILS"},
{name: "Italian Lira", value: "ITL"},
{name: "Jamaican Dollar", value: "JMD"},
{name: "Japanese Yen", value: "JPY"},
{name: "Jordanian Dinar", value: "JOD"},
{name: "Kazakhstani Tenge", value: "KZT"},
{name: "Kenyan Shilling", value: "KES"},
{name: "Kuwaiti Dinar", value: "KWD"},
{name: "Kyrgystani Som", value: "KGS"},
{name: "Laotian Kip", value: "LAK"},
{name: "Latvian Lats", value: "LVL"},
{name: "Lebanese Pound", value: "LBP"},
{name: "Lesotho Loti", value: "LSL"},
{name: "Liberian Dollar", value: "LRD"},
{name: "Libyan Dinar", value: "LYD"},
{name: "Litecoin", value: "LTC"},
{name: "Lithuanian Litas", value: "LTL"},
{name: "Macanese Pataca", value: "MOP"},
{name: "Macedonian Denar", value: "MKD"},
{name: "Malagasy Ariary", value: "MGA"},
{name: "Malawian Kwacha", value: "MWK"},
{name: "Malaysian Ringgit", value: "MYR"},
{name: "Maldivian Rufiyaa", value: "MVR"},
{name: "Mauritanian Ouguiya", value: "MRO"},
{name: "Mauritian Rupee", value: "MUR"},
{name: "Mexican Peso", value: "MXN"},
{name: "Moldovan Leu", value: "MDL"},
{name: "Mongolian Tugrik", value: "MNT"},
{name: "Moroccan Dirham", value: "MAD"},
{name: "Mozambican Metical", value: "MZM"},
{name: "Myanmar Kyat", value: "MMK"},
{name: "Namibian Dollar", value: "NAD"},
{name: "Nepalese Rupee", value: "NPR"},
{name: "Netherlands Antillean Guilder", value: "ANG"},
{name: "New Taiwan Dollar", value: "TWD"},
{name: "New Zealand Dollar", value: "NZD"},
{name: "Nicaraguan Córdoba", value: "NIO"},
{name: "Nigerian Naira", value: "NGN"},
{name: "North Korean Won", value: "KPW"},
{name: "Norwegian Krone", value: "NOK"},
{name: "Omani Rial", value: "OMR"},
{name: "Pakistani Rupee", value: "PKR"},
{name: "Panamanian Balboa", value: "PAB"},
{name: "Papua New Guinean Kina", value: "PGK"},
{name: "Paraguayan Guarani", value: "PYG"},
{name: "Peruvian Nuevo Sol", value: "PEN"},
{name: "Philippine Peso", value: "PHP"},
{name: "Polish Zloty", value: "PLN"},
{name: "Qatari Rial", value: "QAR"},
{name: "Romanian Leu", value: "RON"},
{name: "Russian Ruble", value: "RUB"},
{name: "Rwandan Franc", value: "RWF"},
{name: "Salvadoran Colón", value: "SVC"},
{name: "Samoan Tala", value: "WST"},
{name: "São Tomé and Príncipe Dobra", value: "STD"},
{name: "Saudi Riyal", value: "SAR"},
{name: "Serbian Dinar", value: "RSD"},
{name: "Seychellois Rupee", value: "SCR"},
{name: "Sierra Leonean Leone", value: "SLL"},
{name: "Singapore Dollar", value: "SGD"},
{name: "Slovak Koruna", value: "SKK"},
{name: "Solomon Islands Dollar", value: "SBD"},
{name: "Somali Shilling", value: "SOS"},
{name: "South African Rand", value: "ZAR"},
{name: "South Korean Won", value: "KRW"},
{name: "South Sudanese Pound", value: "SSP"},
{name: "Special Drawing Rights", value: "XDR"},
{name: "Sri Lankan Rupee", value: "LKR"},
{name: "St. Helena Pound", value: "SHP"},
{name: "Sudanese Pound", value: "SDG"},
{name: "Surinamese Dollar", value: "SRD"},
{name: "Swazi Lilangeni", value: "SZL"},
{name: "Swedish Krona", value: "SEK"},
{name: "Swiss Franc", value: "CHF"},
{name: "Syrian Pound", value: "SYP"},
{name: "Tajikistani Somoni", value: "TJS"},
{name: "Tanzanian Shilling", value: "TZS"},
{name: "Thai Baht", value: "THB"},
{name: "Tongan Pa'anga", value: "TOP"},
{name: "Trinidad & Tobago Dollar", value: "TTD"},
{name: "Tunisian Dinar", value: "TND"},
{name: "Turkish Lira", value: "TRY"},
{name: "Turkmenistani Manat", value: "TMT"},
{name: "Ugandan Shilling", value: "UGX"},
{name: "Ukrainian Hryvnia", value: "UAH"},
{name: "United Arab Emirates Dirham", value: "AED"},
{name: "Uruguayan Peso", value: "UYU"},
{name: "US Dollar", value: "USD"},
{name: "Uzbekistan Som", value: "UZS"},
{name: "Vanuatu Vatu", value: "VUV"},
{name: "Venezuelan BolÃvar", value: "VEF"},
{name: "Vietnamese Dong", value: "VND"},
{name: "Yemeni Rial", value: "YER"},
{name: "Zambian Kwacha", value: "ZMK"},
{name: "Zimbabwean dollar", value: "ZWL"},
{name: 'USD', value: 'USD'},
{name: 'AED', value: 'AED'},
{name: 'AFN', value: 'AFN'},
{name: 'ALL', value: 'ALL'},
{name: 'AMD', value: 'AMD'},
{name: 'ANG', value: 'ANG'},
{name: 'AOA', value: 'AOA'},
{name: 'ARS', value: 'ARS'},
{name: 'AUD', value: 'AUD'},
{name: 'AWG', value: 'AWG'},
{name: 'AZN', value: 'AZN'},
{name: 'BAM', value: 'BAM'},
{name: 'BBD', value: 'BBD'},
{name: 'BDT', value: 'BDT'},
{name: 'BGN', value: 'BGN'},
{name: 'BHD', value: 'BHD'},
{name: 'BIF', value: 'BIF'},
{name: 'BMD', value: 'BMD'},
{name: 'BND', value: 'BND'},
{name: 'BOB', value: 'BOB'},
{name: 'BRL', value: 'BRL'},
{name: 'BSD', value: 'BSD'},
{name: 'BTN', value: 'BTN'},
{name: 'BWP', value: 'BWP'},
{name: 'BYN', value: 'BYN'},
{name: 'BZD', value: 'BZD'},
{name: 'CAD', value: 'CAD'},
{name: 'CDF', value: 'CDF'},
{name: 'CHF', value: 'CHF'},
{name: 'CLP', value: 'CLP'},
{name: 'CNY', value: 'CNY'},
{name: 'COP', value: 'COP'},
{name: 'CRC', value: 'CRC'},
{name: 'CUP', value: 'CUP'},
{name: 'CVE', value: 'CVE'},
{name: 'CZK', value: 'CZK'},
{name: 'DJF', value: 'DJF'},
{name: 'DKK', value: 'DKK'},
{name: 'DOP', value: 'DOP'},
{name: 'DZD', value: 'DZD'},
{name: 'EGP', value: 'EGP'},
{name: 'ERN', value: 'ERN'},
{name: 'ETB', value: 'ETB'},
{name: 'EUR', value: 'EUR'},
{name: 'FJD', value: 'FJD'},
{name: 'FKP', value: 'FKP'},
{name: 'FOK', value: 'FOK'},
{name: 'GBP', value: 'GBP'},
{name: 'GEL', value: 'GEL'},
{name: 'GGP', value: 'GGP'},
{name: 'GHS', value: 'GHS'},
{name: 'GIP', value: 'GIP'},
{name: 'GMD', value: 'GMD'},
{name: 'GNF', value: 'GNF'},
{name: 'GTQ', value: 'GTQ'},
{name: 'GYD', value: 'GYD'},
{name: 'HKD', value: 'HKD'},
{name: 'HNL', value: 'HNL'},
{name: 'HRK', value: 'HRK'},
{name: 'HTG', value: 'HTG'},
{name: 'HUF', value: 'HUF'},
{name: 'IDR', value: 'IDR'},
{name: 'ILS', value: 'ILS'},
{name: 'IMP', value: 'IMP'},
{name: 'INR', value: 'INR'},
{name: 'IQD', value: 'IQD'},
{name: 'IRR', value: 'IRR'},
{name: 'ISK', value: 'ISK'},
{name: 'JEP', value: 'JEP'},
{name: 'JMD', value: 'JMD'},
{name: 'JOD', value: 'JOD'},
{name: 'JPY', value: 'JPY'},
{name: 'KES', value: 'KES'},
{name: 'KGS', value: 'KGS'},
{name: 'KHR', value: 'KHR'},
{name: 'KID', value: 'KID'},
{name: 'KMF', value: 'KMF'},
{name: 'KRW', value: 'KRW'},
{name: 'KWD', value: 'KWD'},
{name: 'KYD', value: 'KYD'},
{name: 'KZT', value: 'KZT'},
{name: 'LAK', value: 'LAK'},
{name: 'LBP', value: 'LBP'},
{name: 'LKR', value: 'LKR'},
{name: 'LRD', value: 'LRD'},
{name: 'LSL', value: 'LSL'},
{name: 'LYD', value: 'LYD'},
{name: 'MAD', value: 'MAD'},
{name: 'MDL', value: 'MDL'},
{name: 'MGA', value: 'MGA'},
{name: 'MKD', value: 'MKD'},
{name: 'MMK', value: 'MMK'},
{name: 'MNT', value: 'MNT'},
{name: 'MOP', value: 'MOP'},
{name: 'MRU', value: 'MRU'},
{name: 'MUR', value: 'MUR'},
{name: 'MVR', value: 'MVR'},
{name: 'MWK', value: 'MWK'},
{name: 'MXN', value: 'MXN'},
{name: 'MYR', value: 'MYR'},
{name: 'MZN', value: 'MZN'},
{name: 'NAD', value: 'NAD'},
{name: 'NGN', value: 'NGN'},
{name: 'NIO', value: 'NIO'},
{name: 'NOK', value: 'NOK'},
{name: 'NPR', value: 'NPR'},
{name: 'NZD', value: 'NZD'},
{name: 'OMR', value: 'OMR'},
{name: 'PAB', value: 'PAB'},
{name: 'PEN', value: 'PEN'},
{name: 'PGK', value: 'PGK'},
{name: 'PHP', value: 'PHP'},
{name: 'PKR', value: 'PKR'},
{name: 'PLN', value: 'PLN'},
{name: 'PYG', value: 'PYG'},
{name: 'QAR', value: 'QAR'},
{name: 'RON', value: 'RON'},
{name: 'RSD', value: 'RSD'},
{name: 'RUB', value: 'RUB'},
{name: 'RWF', value: 'RWF'},
{name: 'SAR', value: 'SAR'},
{name: 'SBD', value: 'SBD'},
{name: 'SCR', value: 'SCR'},
{name: 'SDG', value: 'SDG'},
{name: 'SEK', value: 'SEK'},
{name: 'SGD', value: 'SGD'},
{name: 'SHP', value: 'SHP'},
{name: 'SLE', value: 'SLE'},
{name: 'SLL', value: 'SLL'},
{name: 'SOS', value: 'SOS'},
{name: 'SRD', value: 'SRD'},
{name: 'SSP', value: 'SSP'},
{name: 'STN', value: 'STN'},
{name: 'SYP', value: 'SYP'},
{name: 'SZL', value: 'SZL'},
{name: 'THB', value: 'THB'},
{name: 'TJS', value: 'TJS'},
{name: 'TMT', value: 'TMT'},
{name: 'TND', value: 'TND'},
{name: 'TOP', value: 'TOP'},
{name: 'TRY', value: 'TRY'},
{name: 'TTD', value: 'TTD'},
{name: 'TVD', value: 'TVD'},
{name: 'TWD', value: 'TWD'},
{name: 'TZS', value: 'TZS'},
{name: 'UAH', value: 'UAH'},
{name: 'UGX', value: 'UGX'},
{name: 'UYU', value: 'UYU'},
{name: 'UZS', value: 'UZS'},
{name: 'VES', value: 'VES'},
{name: 'VND', value: 'VND'},
{name: 'VUV', value: 'VUV'},
{name: 'WST', value: 'WST'},
{name: 'XAF', value: 'XAF'},
{name: 'XCD', value: 'XCD'},
{name: 'XDR', value: 'XDR'},
{name: 'XOF', value: 'XOF'},
{name: 'XPF', value: 'XPF'},
{name: 'YER', value: 'YER'},
{name: 'ZAR', value: 'ZAR'},
{name: 'ZMW', value: 'ZMW'},
{name: 'ZWL', value: 'ZWL'},
];

/**
 * Test server info commands
 * 
 * @returns Bot replies with server name and member count
 */
export const currency: Command = {
	data: new SlashCommandBuilder()
		.setName('currency')
		.setDescription('Convert an amount from one currency to another.')

        .addStringOption(option =>
            option.setName('from')
                .setDescription('The currency to convert from')
                .setRequired(true)
                .setAutocomplete(true))

        .addNumberOption(option =>
            option.setName('value')
                .setDescription('The ammount to convert')
                .setRequired(true))

        .addStringOption(option =>
            option.setName('to')
                .setDescription('The currency to convert to')
                .setRequired(true)
                .setAutocomplete(true)),

	async execute(interaction:ChatInputCommandInteraction) {
        const currencyFrom = interaction.options.getString('from');
        const currencyValue = interaction.options.getNumber('value');
        const currencyTo = interaction.options.getString('to');

        if(currencyFrom && currencyValue && currencyTo) {
            const currencyTable = await axios.get('https://v6.exchangerate-api.com/v6/168e2a62b1c6599adcba93e8/latest/USD');

            const usdAmmount = currencyValue / currencyTable['data']['conversion_rates'][currencyFrom];
            const convertedValue = currencyTable['data']['conversion_rates'][currencyTo] * usdAmmount;
        
            interaction.reply(currencyValue + ' ' + currencyFrom + ' is ' + convertedValue.toFixed(2) + ' ' + currencyTo);
        } else {
            interaction.reply('Something went wrong getting values from the command.');
        }
	},

    async autocomplete(interaction:AutocompleteInteraction) {
        const focusedValue = interaction.options.getFocused().toLowerCase();

		const filtered = currencyChoices.filter(choice => choice['name'].toLowerCase().includes(focusedValue));
		await interaction.respond(filtered.slice(0,25));
    }
};
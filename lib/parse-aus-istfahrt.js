// todo: find a less homegrown way to do this. is there a way to get xml-stream-saxes to emit our desired format right away?
const parseAusIstFahrt = (istFahrt) => {
	const result = {
		LinienID: istFahrt.LinienID?.$text || null,
		LinienText: istFahrt.LinienText?.$text || null,
		RichtungsID: istFahrt.RichtungsID?.$text || null,
		RichtungsText: istFahrt.RichtungsText?.$text || null,
		FahrtID: istFahrt.FahrtRef?.FahrtID ? {
			FahrtBezeichner: istFahrt.FahrtRef?.FahrtID?.FahrtBezeichner?.$text || null,
			Betriebstag: istFahrt.FahrtRef?.FahrtID?.Betriebstag?.$text || null,
		} : null,
		Komplettfahrt: istFahrt.Komplettfahrt?.$text || null,
		UmlaufID: istFahrt.UmlaufID?.$text || null,
		PrognoseMoeglich: istFahrt.PrognoseMoeglich?.$text || null,
		FahrzeugTypID: istFahrt.FahrzeugTypID?.$text || null,
		ServiceAttributs: istFahrt.ServiceAttribut
			? istFahrt.ServiceAttribut.$children.map(sA => [sA.$name, sA.$text])
			: [],
		IstHalts: istFahrt.$children
			.filter(c => c.$name === 'IstHalt')
			.map(istHalt => ({
				HaltID: istHalt.HaltID?.$text || null,
				Abfahrtszeit: istHalt.Abfahrtszeit?.$text || null,
				IstAbfahrtPrognose: istHalt.IstAbfahrtPrognose?.$text || null,
				AbfahrtssteigText: istHalt.AbfahrtssteigText?.$text || null,
				Einsteigeverbot: istHalt.Einsteigeverbot?.$text || null,
				Ankunftszeit: istHalt.Ankunftszeit?.$text || null,
				IstAnkunftPrognose: istHalt.IstAnkunftPrognose?.$text || null,
				AnkunftssteigText: istHalt.AnkunftssteigText?.$text || null,
				Aussteigeverbot: istHalt.Aussteigeverbot?.$text || null,
				Durchfahrt: istHalt.Durchfahrt?.$text || null,
				Zusatzhalt: istHalt.Zusatzhalt?.$text || null,
				HinweisText: istHalt.HinweisText?.$text || null,
			})),
	}

	return result
}

export {
	parseAusIstFahrt,
}

'use client';

import { place_page, User } from "@prisma/client";
import { useMemo } from "react";

import getContactMsg from "@/app/function/getContactMsg";
import isOwner from "@/app/function/isOwner";
import isRepublica from "@/app/function/isRepublica";
import placeType from "@/app/function/placeType";
import { getSafeInstagramHref } from "@/app/utils/instagram";

export function usePlaceDetails(place: place_page | null, currentUser?: User | null) {
  return useMemo(() => {
    const tipo = placeType(place?.tipo as string, false);
    const isRep = isRepublica(place?.tipo as string);
    const contactHref = getContactMsg(
      tipo,
      place?.contato ?? "",
      place?.end_rua ?? "",
      place?.end_numero ?? 0,
      place?.mensalidade ?? 0
    );
    const contactName = place?.nome_contato || place?.name || "responsável";

    return {
      isRep,
      isOwner: isOwner(currentUser?.id ?? "", place?.id ?? ""),
      contactHref,
      contactLabel: `Falar com ${contactName}`,
      instagramHref: getSafeInstagramHref(place?.instagram),
    };
  }, [currentUser?.id, place]);
}

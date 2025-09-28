"use client";

import FavoriteCard from '@/components/FavoriteCard';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import { useGetAuthUserQuery, useGetPropertiesQuery, useGetTenantQuery, useRemoveFavoritePropertyMutation } from '@/state/api';
import { Property } from '@/types/prismaTypes';
import React from 'react'

const Favorites = () => {

  const { data: authUser } = useGetAuthUserQuery();
  const { data: tenant } = useGetTenantQuery(
    authUser?.cognitoInfo?.userId || "",
    {
      skip: !authUser?.cognitoInfo?.userId,
    }
  );

  const [removeFavorite] = useRemoveFavoritePropertyMutation();

  const {
    data: favoriteProperties,
    isLoading,
    error,
  } = useGetPropertiesQuery(
    { favoriteIds: tenant?.favorites?.map((fav: { id: number }) => fav.id) },
    { skip: !tenant?.favorites || tenant?.favorites.length === 0 }
  );

  const handleRemoveFavorite = async (propertyId: number) => {
    if (!authUser?.cognitoInfo?.userId) return;

    const confirmed = window.confirm("Are you sure you want to remove this property from your favorites?");

    if (!confirmed) return;

    try {
      await removeFavorite({
        cognitoId: authUser.cognitoInfo.userId,
        propertyId,
      }).unwrap();
    } catch (err) {
      console.error("Failed to remove favorite:", err);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading favorites</div>;

  return (
    <div className="dashboard-container">
      <Header
        title="Favorite Properties"
        subtitle="Browse and manage your saved property listings."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        {favoriteProperties?.map((property) => (
          <FavoriteCard
            key={property.id}
            property={property}
            isFavorite={
              tenant?.favorites?.some(
                (fav: Property) => fav.id === property.id
              ) || false
            }
            removeFavorite={() => handleRemoveFavorite(property.id)}
            showFavoriteButton={!!authUser}
          />
        ))}
      </div>
      {(!favoriteProperties || favoriteProperties.length === 0) && (
        <p>You don&lsquo;t have any favorite properties.</p>
      )}
    </div>
  )
}

export default Favorites
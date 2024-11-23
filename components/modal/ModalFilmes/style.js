
import { StyleSheet } from 'react-native';

export const modalStyles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#14213D',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        alignItems: 'center',
    },
    modalPoster: {
        color: '#E5E5E5',
        width: 200,
        height: 300,
        marginBottom: 15,
    },
    modalTitle: {
        color: '#FCA311',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    modalDescription: {
        color: '#E5E5E5',

        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
    },
    modalRating: {
        color: '#FCA311',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalLocation: {
        color: '#E5E5E5',
        fontSize: 14,
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: '#FCA311',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    
});